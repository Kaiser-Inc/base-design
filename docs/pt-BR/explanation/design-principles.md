# Princípios de design

[English](../../en/explanation/design-principles.md)

O KaiserInc Base busca interfaces planas, largas, suaves e consistentes, com cara de produto real. Esta página explica as escolhas por trás disso e o que cada uma custa.

## Qualidade vinda da estrutura, não de efeito

Espaçamento, tipografia, hierarquia e proporção carregam a qualidade visual. Degradê, glow, blur pesado e glassmorphism ficam de fora, porque envelhecem rápido e fazem a tela parecer template. O sistema abre mão de um impacto imediato em troca de telas que continuam legíveis na décima visita.

## Conteúdo na página, não em janelas

Uma seção não ganha uma caixa com fundo próprio, borda e sombra só para se separar da página. As seções se separam por espaço, um título e, no máximo, uma linha fina. As únicas superfícies que sobem acima da página são as que flutuam: menus, diálogos e toasts.

Isso deixa a página calma e larga. O custo aparece em páginas de documentação, onde uma demo pode se misturar ao texto; a vitrine resolve com um rótulo "Exemplo" e uma linha fina ao lado de cada demo, e não com um card.

## Largo por padrão

As páginas vão até 1600px, e as tabelas ocupam a largura toda. A largura só é limitada quando a leitura pede: um formulário de coluna única fica em até 720px, e as descrições em cerca de 60 caracteres por linha. Centralizar tudo numa coluna estreita desperdiça a tela das ferramentas onde o pessoal da KaiserInc passa o dia.

## Um acento, cores suaves

Existe um único acento, o violeta no matiz 293, herdado do preset do shadcn de onde o sistema partiu. O croma dele caiu de 0,27 para 0,17, e a página nunca usa branco nem preto puro. As cores de sucesso, atenção e erro aparecem só em texto, ícone e borda, nunca como fundo saturado.

O acento tem dois tokens. O `--primary` é o mesmo violeta nos dois temas, para a marca não mudar de cor quando o tema muda. Esse violeta funciona como preenchimento, mas não como texto sobre o fundo escuro (2,9:1); por isso, texto e ícone violetas usam o `--primary-text`, mais claro no escuro (7,7:1).

## Uma única altura de controle

Botões, inputs, selects e todos os outros controles têm 32px de altura, o `h-8` do estilo Rhea do shadcn. Tabelas podem usar 28px nas ações das linhas; nada mais ganha um terceiro tamanho. Uma tela em que todos os controles se alinham não precisa de enfeite para parecer pensada.

Os campos são preenchidos com um tom neutro e não têm borda, como no estilo Rhea. Quem marca o campo ativo é o anel de foco.

## Escuro primeiro, os dois temas completos

A KaiserInc trabalha no escuro, então o tema escuro é o padrão, e toda tela é desenhada e revisada nele primeiro. O tema claro não é um acessório: cada token tem o seu valor claro, com contraste medido, e toda tela é conferida nos dois antes de ir para o ar.

## Português do Brasil por padrão

A KaiserInc constrói para usuários e times brasileiros, então os textos padrão dos componentes estão em português: "Cancelar", "Confirmar", "Carregando". Todo texto é uma prop, e um produto em inglês passa os seus.

## Uma registry, não um pacote

Os componentes são distribuídos como registry shadcn. O `shadcn add` copia o código-fonte para o projeto, que passa a ser dono dele. O projeto pode ajustar um componente sem fazer fork de pacote nem esperar versão nova. O custo é que as melhorias não chegam sozinhas: para ter a versão nova de um componente, o projeto roda o `shadcn add` de novo e revisa o diff. Para um grupo pequeno, com poucos produtos, código legível e editável vale mais que atualização automática.
