let words = [
  { word: "variavel", clue: "Base para armazenar valores em Python" },
  { word: "lista", clue: "Estrutura de dados que armazena múltiplos itens" },
  { word: "matriz", clue: "Lista de listas usada para representar tabelas ou grades" },
  { word: "if", clue: "Palavra-chave usada para tomar decisões condicionais" },
  { word: "elif", clue: "Verifica outra condição no bloco `if`" },
  { word: "else", clue: "Executa um bloco de código quando nenhuma condição é verdadeira" },
  { word: "for", clue: "Estrutura de repetição que percorre uma sequência" },
  { word: "while", clue: "Estrutura de repetição baseada em uma condição" },
  { word: "break", clue: "Interrompe um loop antes de completar todas as iterações" },
  { word: "continue", clue: "Pula para a próxima iteração de um loop" },
  { word: "pass", clue: "Usado como um espaço reservado em Python" },
  { word: "len", clue: "Função para contar o tamanho de uma lista ou string" },
  { word: "range", clue: "Cria uma sequência de números para loops" },
  { word: "print", clue: "Função usada para exibir informações na tela" },
  { word: "input", clue: "Função usada para receber dados do usuário" },
  { word: "strip", clue: "Remove espaços no início e no final de uma string" },
  { word: "split", clue: "Divide uma string em partes, retornando uma lista" },
  { word: "join", clue: "Combina elementos de uma lista em uma única string" },
  { word: "replace", clue: "Substitui partes de uma string por outra" },
  { word: "lower", clue: "Converte uma string para letras minúsculas" },
  { word: "upper", clue: "Converte uma string para letras maiúsculas" },
  { word: "capitalize", clue: "Converte a primeira letra de uma string para maiúscula" },
  { word: "isdigit", clue: "Verifica se uma string contém apenas números" },
  { word: "islower", clue: "Verifica se todos os caracteres são minúsculos" },
  { word: "isupper", clue: "Verifica se todos os caracteres são maiúsculos" },
  { word: "find", clue: "Retorna o índice da primeira ocorrência de um caractere em uma string" },
  { word: "sort", clue: "Organiza uma lista em ordem crescente ou decrescente" },
  { word: "append", clue: "Adiciona um elemento ao final de uma lista" },
  { word: "insert", clue: "Adiciona um elemento em uma posição específica da lista" },
  { word: "pop", clue: "Remove e retorna o último item de uma lista" },
  { word: "remove", clue: "Remove a primeira ocorrência de um elemento da lista" },
  { word: "reverse", clue: "Inverte a ordem dos elementos de uma lista" },
  { word: "sum", clue: "Calcula a soma dos elementos em uma lista" },
  { word: "max", clue: "Retorna o maior valor de uma lista" },
  { word: "min", clue: "Retorna o menor valor de uma lista" },
  { word: "round", clue: "Arredonda um número para o inteiro mais próximo" },
  { word: "pow", clue: "Calcula a potência de um número" },
  { word: "abs", clue: "Retorna o valor absoluto de um número" },
  { word: "math", clue: "Biblioteca para cálculos matemáticos avançados" },
  { word: "random", clue: "Biblioteca usada para gerar números aleatórios" },
  { word: "shuffle", clue: "Mistura os elementos de uma lista aleatoriamente" },
  { word: "choice", clue: "Seleciona aleatoriamente um elemento de uma lista" },
  { word: "factorial", clue: "Calcula o fatorial de um número (usando `math`)" },
  { word: "sqrt", clue: "Calcula a raiz quadrada de um número (usando `math`)" },
  { word: "ceil", clue: "Arredonda um número para cima (usando `math`)" },
  { word: "floor", clue: "Arredonda um número para baixo (usando `math`)" },
  { word: "time", clue: "Biblioteca usada para medir ou pausar o tempo" },
  { word: "sleep", clue: "Pausa a execução do programa por alguns segundos (usando `time`)" },
  { word: "startswith", clue: "Verifica se uma string começa com um determinado caractere" },
  { word: "endswith", clue: "Verifica se uma string termina com um determinado caractere" },
  { word: "enumerate", clue: "Retorna índices e elementos durante a iteração" },
  { word: "tupla", clue: "Coleção de elementos imutáveis em Python" },
  { word: "dicionario", clue: "Estrutura de dados que armazena pares chave-valor" },
  { word: "key", clue: "A chave usada para acessar o valor em um dicionário" },
  { word: "value", clue: "O valor associado a uma chave em um dicionário" },
  { word: "items", clue: "Método que retorna todos os pares chave-valor de um dicionário" },
  { word: "dict", clue: "Função usada para criar um dicionário em Python" },
  { word: "clear", clue: "Método que limpa todos os itens de um dicionário" },
  { word: "get", clue: "Método usado para acessar um valor em um dicionário com segurança" },
  { word: "update", clue: "Método usado para atualizar os valores em um dicionário" },
  { word: "popitem", clue: "Método que remove e retorna o último par chave-valor de um dicionário" }
];

export default function getWord() {
  if (words.length === 0) {

    console.log("Todas as perguntas foram usadas! Reinicie o jogo para mais perguntas.");
    return null; 
  }
  
  const index = Math.floor(Math.random() * words.length);
  const selectedWord = words[index];
  words.splice(index, 1); 

  return selectedWord;
}
