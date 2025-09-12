# Diferença entre `parse` e `safeParse` no Zod

## `parse`
- Faz a validação e **lança um erro (throw)** caso os dados não sejam válidos.  
- Interrompe a execução se algo estiver errado.  
- É indicado quando você **confia que os dados já estão corretos** e quer que a aplicação pare imediatamente em caso de falha.  
- Isso significa que você precisa usar **try/catch** sempre que usar **parse**, porque ele interrompe a execução se os dados não forem válidos.
- Exemplo:
```ts
import { z } from "zod";

const schema = z.object({ name: z.string() });
const result = schema.parse({}); 
// ❌ lança exceção: ZodError: Required
```
---

## `safeParse`
- Faz a validação, mas **não lança erro**.  
- Sempre retorna um objeto no formato `{ success, data | error }`.  
- É indicado quando você **quer tratar manualmente os erros**, por exemplo, para retornar uma resposta de **400 Bad Request** em uma API.  
- Exemplo com erro:
```ts
const schema = z.object({ name: z.string() });
const result = schema.safeParse({}); 
console.log(result);
// {
//   success: false,
//   error: ZodError { issues: [Array] }
// }
```

- Exemplo certo:
```ts
const result = schema.safeParse({ name: "Andreza" });
console.log(result);
// {
//   success: true,
//   data: { name: "Andreza" }
// }
```

---

## Diferença prática
- **`parse`**: usado em cenários controlados, onde os dados já foram validados antes. Lança exceção se não estiverem.
- **`safeParse`**: usado em cenários onde os dados vêm de fora (ex.: requisições de API), garantindo que a aplicação não quebre em caso de entrada inválida. Não lança erro, retorna **{ success, data | error }**

---

## Em APIs (Express, por exemplo)
O `safeParse` é a escolha ideal porque permite **validar os dados recebidos sem interromper a execução da aplicação** e devolver mensagens de erro claras ao cliente.
Assim conseguimos devolver uma resposta clara pro cliente:
```ts
router.post("/hello", (req, res) => {
  const parse = helloSchema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({
      error: "Validação falhou",
      issues: parse.error.issues,
    });
  }

  return res.json({ message: `Hello, ${parse.data.name}` });
});
```
