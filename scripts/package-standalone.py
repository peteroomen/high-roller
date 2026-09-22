from pathlib import Path
import re,base64,sys
root=Path(__file__).resolve().parents[1]
dist=root/'dist'
html=(dist/'index.html').read_text()
def data(path):
 p=dist/path.lstrip('/')
 mime={'.woff2':'font/woff2','.woff':'font/woff','.svg':'image/svg+xml'}.get(p.suffix,'application/octet-stream')
 return f'data:{mime};base64,'+base64.b64encode(p.read_bytes()).decode()
def style(m):
 css=(dist/m.group(1).lstrip('/')).read_text()
 css=re.sub(r'url\((/assets/[^)]+)\)',lambda x:'url('+data(x.group(1))+')',css)
 return '<style>'+css+'</style>'
html=re.sub(r'<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>',style,html)
html=re.sub(r'<script type="module"[^>]*src="([^"]+)"[^>]*></script>',lambda m:'<script type="module">'+(dist/m.group(1).lstrip('/')).read_text().replace('</script','<\\/script')+'</script>',html)
html=re.sub(r'href="(/assets/[^" ]+\.svg)"',lambda m:'href="'+data(m.group(1))+'"',html)
# Inline module was originally in the head; defer it until the DOM exists.
script=re.search(r'<script type="module">.*?</script>',html,re.S).group(0)
html=html.replace(script,'').replace('</body>',script+'</body>')
out=Path(sys.argv[1]) if len(sys.argv)>1 else root.parent/'High-Roller-playtest.html'
out.write_text(html)
print(str(out),out.stat().st_size)
