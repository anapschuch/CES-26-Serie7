// reducer
export default function calculator(state, action) {
    switch (action.type) {
      // número ou . (ponto)
      case 'NUMBER':
        return {
          expression: state.expression.concat(action.pressed),
          displayE: state.expression.concat(action.pressed),
          result: 0,
        };
      // operação
      case 'OPERATOR':
        return {
          expression: state.expression.concat(' ' + action.pressed + ' '),
          displayE: state.expression.concat(' ' + action.pressed + ' '),
          result: 0,
        };
      // tecla igual
      case 'EQUAL':
        return {
          expression: '',
          displayE: state.expression,
          result: calculateExpression(state.expression),
        };
  
      // limpar
      case 'CLEAR':
        return {
          expression: '',
          displayE: '',
          result: 0,
        };
      default:
        return state;
    }
  }
  
  // retorna true se entrada top (que deve vir da pilha no algoritmo) tiver
  // precedencia maior ou igual que entrada operator
  function calculatePrecedence(top, operator) {
    if (operator === '+' || operator === '-') {
      return true;
    }
    if (top === 'x' || top === '/') {
      return true;
    } else {
      return false;
    }
  }
  
  // retorna resultado do cálculo da expressão dada em expression
  function calculateExpression(expression) {
    const split = expression.split(' ');
    var queue = [];
    var stack = [];
    var op;
  
    /// transforma expressão para sua forma pós-fixada (reverse polish notation)
    for (var i = 0; i < split.length; i++) {
      if (Number(split[i])) {
        queue.push(parseFloat(split[i]));
      } else {
        while (
          stack.length > 0 &&
          calculatePrecedence(stack[stack.length - 1], split[i])
        ) {
          op = stack.pop();
          queue.push(op);
        }
        stack.push(split[i]);
      }
    }
    while (stack.length > 0) {
      op = stack.pop();
      queue.push(op);
    }
  
    /// calcula expressão a partir da forma pós-fixada
    for (i = 0; i < queue.length; i++) {
      if (Number(queue[i])) {
        stack.push(queue[i]);
      } else {
        var x = stack.pop();
        var y = stack.pop();
        let result = 0;
        switch (queue[i]) {
          case '+':
            result = y + x;
            break;
          case '-':
            result = y - x;
            break;
          case 'x':
            result = x * y;
            break;
          case '/':
            result = y / x;
            break;
          default:
            result = undefined;
        }
        stack.push(result);
      }
    }
    return stack[0];
  }
  