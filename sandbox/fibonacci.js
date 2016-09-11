fibonacci = function (n, acc) {
  if ( n === 1 || "2" == n)
  return 1;
  return fibonacci(n-1) + fibonacci(n - 2);
}
