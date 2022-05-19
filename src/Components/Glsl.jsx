import { useEffect , useRef } from "react";
import { glslToMinimalRenderer } from "shader-park-core";

export default function Glsl(){
    let can = document.createElement("canvas");
    let canva = useRef();
    let att = useRef();
    let glsl = `
    float surfaceDistance(vec3 p) {
        p.xyz *= 1.0+0.16*noise(5.0*p+time);
        return sphere(p, 0.3);
    }
    
    // Here you can define how your object at point p will be colored.
    vec3 shade(vec3 p, vec3 normal) {
        vec3 lightDirection = vec3(0.0, 1.0, 0.0);
        float light = simpleLighting(p, normal, lightDirection);
        light *= smoothstep(0.12,0.35,length(p));
        vec3 color = vec3(1.0, 1.0, 1.0);
        return color*light;
    }
    `
     
    let one = `
    float surfaceDistance(vec3 p) {
        return sphere(p, 1.);
    }
    
    float density(vec3 p) {
        p.z += fractalNoise(p*10. + time, 2., 2)*nsin(time)*0.1;  
          float ds = (sphere(p, (0.2)) + sphericalDistribution(p,30.0).w);
        p.xy *= rot2(PI*0.5);
          p.yz *= rot2(PI*0.5);
          p*= 2.;
          ds = mix(torus(p, vec2(0.6, 0.02)), ds, ncos(time));
        return 0.5*ds*smoothstep(0.55,0.0,ds);
    }
    
    vec3 shade(vec3 p, vec3 normal) {
        vec3 ray_dir = normalize(worldPos.xyz-cameraPosition);
        vec3 ray_pos = p;
        vec3 col = vec3(normal);
        float dist_to_trav = 1.;
        const int steps = 40;
        float port = dist_to_trav / float(steps);
        float d = 0.0;
        for (int i=0; i < steps; i++) {
            col += density(ray_pos);
          ray_pos += port*ray_dir;
        }
          return col;
    }
    `
    glslToMinimalRenderer(can,glsl);

    useEffect(()=>{
        att.current.appendChild(can);
    },[])

    return(
        <div ref={att}>
            {/* <foreignObject>
            <canvas ref={canva}></canvas>
            </foreignObject> */}
        </div>
    )
}