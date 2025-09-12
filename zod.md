# Zod

## O que é
O **Zod** é uma biblioteca de validação e definição de esquemas em TypeScript/JavaScript.  
Ele permite criar **esquemas** (schemas) que descrevem como os dados devem ser estruturados e faz a validação automática desses dados.

---

## Por que usar
- **Validação de entrada**: garante que os dados recebidos em requisições estejam corretos (tipos, formatos, obrigatoriedade, etc.).  
- **Segurança**: evita que dados inválidos ou malformados cheguem à lógica da aplicação.  
- **Integração com TypeScript**: gera automaticamente os tipos a partir do schema, reduzindo erros e duplicação de código.  
- **Produtividade**: facilita o tratamento de erros de validação e melhora a clareza do código.  

---

## Ponto de atenção
- O `parse` **lança exceções** quando os dados não estão no formato esperado.  
- O `safeParse` retorna um **objeto com sucesso ou erro**, permitindo tratar validações de forma mais controlada.  

---

## Resumindo
O Zod ajuda a manter a aplicação **segura, consistente e confiável**, garantindo que apenas dados válidos sigam para a lógica do sistema.
