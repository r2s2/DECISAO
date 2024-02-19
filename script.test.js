const querystring = require('querystring');

// Teste para verificar se o módulo querystring foi importado corretamente
test('Verificar importação do módulo querystring', () => {
  expect(querystring).toBeDefined();
});

// Teste para verificar se a função stringify está funcionando corretamente
test('Verificar função stringify', () => {
  const obj = { name: 'John', age: 30 };
  const queryString = querystring.stringify(obj);
  expect(queryString).toBe('name=John&age=30');
});

// Teste para verificar se a função parse está funcionando corretamente
test('Verificar função parse', () => {
  const queryString = 'name=John&age=30';
  const obj = querystring.parse(queryString);
  expect(obj).toEqual({ name: 'John', age: '30' });
});