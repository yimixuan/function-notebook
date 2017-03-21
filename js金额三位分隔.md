```
function fmoney(s, n)
{
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')) + '';
  var l = s.split('.') [0].split('').reverse(),
  r = s.split('.') [1];
  var t = '';
  for (var i = 0; i < l.length; i++)
  {t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');}
  if (!r) { r = '0'; }
  if (r.length < n) {for (var i = r.length; i < n; i++) {r += '0';}}else{ r=r.substr(0,n);}
  return t.split('').reverse().join('') + '.' + r;
}
```
结果格式就是2,313.22；22,345.00
