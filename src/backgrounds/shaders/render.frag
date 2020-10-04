
uniform sampler2D frame;
varying vec2 uv;

// jmk
// https://www.shadertoy.com/view/Mdf3zr
float lookup(vec2 p,float dx,float dy,float d)
{
    vec2 uv=p.xy+vec2(dx*d,dy*d)/resolution.xy;
    vec4 c=texture2D(frame,uv.xy);
    
    // return as luma
    return.2126*c.r+.7152*c.g+.0722*c.b;
}

float edge(vec2 p){
    float offset=.5;
    
    // simple sobel edge detection
    float gx=0.;
    gx+=-1.*lookup(p,-1.,-1.,offset);
    gx+=-2.*lookup(p,-1.,0.,offset);
    gx+=-1.*lookup(p,-1.,1.,offset);
    gx+=1.*lookup(p,1.,-1.,offset);
    gx+=2.*lookup(p,1.,0.,offset);
    gx+=1.*lookup(p,1.,1.,offset);
    
    float gy=0.;
    gy+=-1.*lookup(p,-1.,-1.,offset);
    gy+=-2.*lookup(p,0.,-1.,offset);
    gy+=-1.*lookup(p,1.,-1.,offset);
    gy+=1.*lookup(p,-1.,1.,offset);
    gy+=2.*lookup(p,0.,1.,offset);
    gy+=1.*lookup(p,1.,1.,offset);
    
    // hack: use g^2 to conceal noise in the video
    float g=gx*gx+gy*gy;
    // float g2 = g * (sin(iTime) / 2.0 + 0.5);
    return g;
}

void main()
{
    gl_FragColor=texture2D(frame,uv.xy);//vec4(edge(uv));
}