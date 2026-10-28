import * as THREE from 'three'

// Carte de brûlure dessinée dans l'espace UV du mur.
// L'alpha du canvas représente la "chaleur" (1 = brûlant, 0 = froid) ;
// le shader du mur la convertit en couleur (blanc chaud -> rouge -> rouge sombre).
export class BurnTrail
{
    constructor(size = 1024, radius = 0.012)
    {
        this.size = size;
        this.radius = radius;          // rayon d'un impact, en unités UV
        this.fadeEvery = 3;            // on refroidit toutes les N frames
        this.fadeAmount = 0.04;        // part de chaleur perdue à chaque refroidissement
        this.frame = 0;
        this.lastPoint = null;

        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;
        this.ctx = this.canvas.getContext('2d');

        this.texture = new THREE.CanvasTexture(this.canvas);
        this.texture.minFilter = THREE.LinearFilter;
        this.texture.generateMipmaps = false;
    }
    // stretchX : étirement horizontal de l'impact, pour compenser des UV non uniformes
    // (ex. sur une sphère, les UV se resserrent vers les pôles)
    stampAt = (u,v,stretchX = 1)=>
    {
        // légère variation de taille et de position pour un aspect brûlé irrégulier
        let r = this.radius * this.size * (0.8 + Math.random()*0.5);
        let x = u * this.size + (Math.random()-0.5) * r * 0.5 * stretchX;
        let y = (1 - v) * this.size + (Math.random()-0.5) * r * 0.5;
        this.drawSpot(x,y,r,stretchX);
        // impact à cheval sur le bord gauche/droit : on le redessine de l'autre côté
        // pour les surfaces qui se referment (couture de la sphère)
        let rx = r * 2.5 * stretchX;
        if(x < rx) this.drawSpot(x + this.size,y,r,stretchX);
        if(x > this.size - rx) this.drawSpot(x - this.size,y,r,stretchX);
    }
    drawSpot = (x,y,r,stretchX)=>
    {
        let ctx = this.ctx;
        ctx.save();
        ctx.translate(x,y);
        ctx.scale(stretchX,1);
        ctx.translate(-x,-y);
        ctx.globalCompositeOperation = 'source-over';

        // halo diffus autour de l'impact
        let halo = ctx.createRadialGradient(x,y,0,x,y,r*2.5);
        halo.addColorStop(0,'rgba(255,255,255,0.06)');
        halo.addColorStop(1,'rgba(255,255,255,0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x,y,r*2.5,0,Math.PI*2);
        ctx.fill();

        // coeur de la brûlure
        let core = ctx.createRadialGradient(x,y,0,x,y,r);
        core.addColorStop(0,'rgba(255,255,255,0.45)');
        core.addColorStop(0.4,'rgba(255,255,255,0.25)');
        core.addColorStop(1,'rgba(255,255,255,0)');
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(x,y,r,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
    }
    // Ajoute un impact au point UV touché par le laser, en comblant l'écart
    // avec l'impact précédent pour obtenir une traînée continue.
    // stretchForV (optionnel) donne l'étirement horizontal à appliquer selon la coordonnée v.
    burn = (uv,stretchForV = null)=>
    {
        let stretch = (v)=> stretchForV ? stretchForV(v) : 1;
        if(this.lastPoint)
        {
            let dx = uv.x - this.lastPoint.x;
            let dy = uv.y - this.lastPoint.y;
            // passage par la couture (u de 0.99 à 0.01) : on prend le chemin court
            if(dx > 0.5) dx -= 1;
            else if(dx < -0.5) dx += 1;
            let dist = Math.sqrt(dx*dx + dy*dy);
            let step = this.radius * 0.4;
            let count = Math.min(Math.floor(dist / step),200);
            for(let i = 1; i<=count; i++)
            {
                let u = this.lastPoint.x + dx*(i/(count+1));
                let v = this.lastPoint.y + dy*(i/(count+1));
                this.stampAt(u - Math.floor(u),v,stretch(v));
            }
        }
        this.stampAt(uv.x,uv.y,stretch(uv.y));
        this.lastPoint = new THREE.Vector2(uv.x,uv.y);
        this.texture.needsUpdate = true;
    }
    // A appeler quand le laser s'arrête ou quitte le mur, pour ne pas relier
    // deux traînées séparées.
    stop = ()=>
    {
        this.lastPoint = null;
    }
    // Refroidissement progressif de toute la carte (à appeler à chaque frame).
    update = ()=>
    {
        this.frame ++;
        if(this.frame % this.fadeEvery != 0) return;
        let ctx = this.ctx;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = `rgba(0,0,0,${this.fadeAmount})`;
        ctx.fillRect(0,0,this.size,this.size);
        this.texture.needsUpdate = true;
    }
    dispose()
    {
        this.texture.dispose();
    }
}
