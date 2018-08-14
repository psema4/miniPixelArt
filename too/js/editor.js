c = a.getContext("2d");

pixels = [];

prepare = function(size){

  a.width = size * 20;
  a.height = size * 20;
  c.fillStyle = "#aaa";
  for(i = 0; i < size; i++){
    c.fillRect(0, i*20, size * 20, 1);
    c.fillRect(i*20, 0, 1, size * 20);
  }
}

onload = function(){
  prepare(s.value);
  for(i=0;i<s.value;i++){
    pixels.push([]);
  }
}

onchange = oninput = function(){
  prepare(s.value);
  draw();
}

// Reset
r.onclick = s.onchange = s.oninput = function(){
  pixels = [];
  prepare(s.value);
  for(i=0;i<s.value;i++){
    pixels.push([]);
  }
}

// Draw
draw = function(){
  a.width = a.width;
  c.fillStyle = "#aaa";
  for(i = 0; i < s.value; i++){
    c.fillRect(0, i*20, s.value * 20, 1);
    c.fillRect(i*20, 0, 1, s.value * 20);
  }
  
  for(i=0;i<s.value;i++){
    for(j=0;j<s.value;j++){
    
      colorindex = pixels[j][i];
      
      if(colorindex == 1) { ccolor = c1.value; }
      else if(colorindex == 2){ ccolor = c2.value; }
      else if(colorindex == 3){ ccolor = c3.value; }
      else if(colorindex == 4){ ccolor = c4.value; }
      else if(colorindex == 5){ ccolor = c5.value; }
      else if(colorindex == 6){ ccolor = c6.value; }
      else if(colorindex == 7){ ccolor = c7.value; }
      else { ccolor = "transparent" };
      
      c.fillStyle = ccolor;
      
      c.fillRect(i*20, j*20, 20, 20);
      
    }
  }
}

// Trace
m = 0;

a.onmousedown = function(e){
  m = 1;
  trace(e);
}

a.onmousemove = function(e){
  if(m){
    trace(e);
  }
}

a.onmouseup = function(e){
  m = 0;
}

trace = function(e){
  if(p1.checked) { colorindex = 1; currentcolor = c1.value; }
  else if(p2.checked){ colorindex = 2; currentcolor = c2.value; }
  else if(p3.checked){ colorindex = 3; currentcolor = c3.value; }
  else if(p4.checked){ colorindex = 4; currentcolor = c4.value; }
  else if(p5.checked){ colorindex = 5; currentcolor = c5.value; }
  else if(p6.checked){ colorindex = 6; currentcolor = c6.value; }
  else if(p7.checked){ colorindex = 7; currentcolor = c7.value; }
  else if(p8.checked){ colorindex = 0; currentcolor = "transparent" };
  
  x = e.pageX - a.offsetLeft;
  y = e.pageY - a.offsetTop;
  if(currentcolor == "transparent"){
    pixels[(~~(y/20))][(~~(x/20))] = 0;
    draw();
  }
  else {
    c.fillStyle = currentcolor;
    c.fillRect((~~(x/20))*20, (~~(y/20))*20, 20, 20);
    pixels[(~~(y/20))][(~~(x/20))] = colorindex;
  }
}

// export
e.onclick = function(){
  colors = "";
  colors += c1.value.replace("#",'');
  colors += c2.value.replace("#",'');
  colors += c3.value.replace("#",'');
  colors += c4.value.replace("#",'');
  colors += c5.value.replace("#",'');
  colors += c6.value.replace("#",'');
  colors += c7.value.replace("#",'');
  
  px = [];
  pxascii = "";
  
  for(j=0;j<s.value;j++){
    for(i=0;i<s.value;i++){
      px.push(pixels[j][i]);
    }
  }
  
  for(i = 0; i < px.length; i+=2){
    pxascii += String.fromCharCode(0b1000000 + (px[i] || 0) + ((px[i+1] || 0) << 3));
  }
  console.log(colors, px, pxascii);
  
  exp.value = 
`<canvas id=a>
<script>
c=a.getContext\`2d\`
C="${colors}"
px=[];
P="${pxascii}".replace(/./g,a=>{
  z=a.charCodeAt()
  px.push(z&7)
  px.push((z>>3)&7)
})
S=${s.value}
for(j=0;j<S;j++){
  for(i=0;i<S;i++){
    if(px[j*S+i]){
      c.fillStyle="#"+C.substr(6*(px[j*S+i]-1),6);
      c.fillRect(i,j,1,1);
    }
  }
}
<\/script>`

}
