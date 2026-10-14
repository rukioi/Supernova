import type { AppState, Draft, Question, Student } from './model';
export const classes = [
 {id:'empreendedorismo',name:'Empreendedorismo e Inovação',course:'Administração',period:'3º período · 2026.2',students:38,module:'Validação e Modelagem de Negócios',color:'indigo',next:'Hoje · 19:00'},
 {id:'marketing',name:'Marketing Estratégico',course:'Administração',period:'5º período · 2026.2',students:32,module:'Posicionamento e Mercado',color:'teal',next:'Seg, 05 out · 19:00'},
 {id:'gestao',name:'Gestão de Projetos',course:'Engenharia de Produção',period:'4º período · 2026.2',students:29,module:'Planejamento e Execução',color:'amber',next:'Ter, 06 out · 20:40'},
];
const names = ['Ana Clara Martins','Bruno Oliveira','Camila Santos','Daniel Costa','Eduarda Lima','Felipe Almeida','Gabriela Souza','Henrique Rocha','Isabela Ferreira','João Pedro Alves','Karina Ribeiro','Lucas Mendes','Mariana Silva','Nicolas Barbosa','Olivia Nunes','Pedro Henrique Dias','Rafaela Castro','Samuel Araújo','Thaís Carvalho','Vinícius Moreira','Alice Monteiro','Bernardo Gomes','Cecília Fernandes','Diego Cardoso','Elisa Teixeira','Fernando Reis','Giovana Moura','Hugo Batista','Iara Cavalcante','Júlia Freitas','Leonardo Duarte','Luiza Vieira','Mateus Ramos','Natália Correia','Otávio Cunha','Paula Machado','Rafael Pinto','Sofia Azevedo'];
export const students: Student[] = names.map((name,i)=>({id:`aluno-${i+1}`,name,enrollment:`2026${String(1001+i)}`,participation:i>33?0: [100,88,92,79,96][i%5],learning:i===0?83:i>33?0:i<8? [58,61,54,63,56,60,59][(i-1+7)%7]:[92,83,78,88,75,81][i%6],xp:i>33?0: [1240,960,1080,890,1160][i%5],review:i<7,attention:i>0&&i<8}));
export const concepts = [
 {name:'Identificar problemas relevantes',state:'Consolidado',value:89},
 {name:'Definir segmento de clientes',state:'Quase consolidado',value:78},
 {name:'Diferenciar usuário e cliente',state:'Em desenvolvimento',value:72},
 {name:'Formular hipótese de valor',state:'Não avaliado',value:0},
];
const bank = [
 ['Uma escola contrata um aplicativo que os alunos utilizam. Quem é o comprador?', ['A escola, que decide e paga','Os alunos, que utilizam','Todos os usuários','A equipe de desenvolvimento'],0,'O comprador realiza a decisão de compra. O usuário utiliza a solução; esses papéis podem ser diferentes.','Usuário e comprador'],
 ['Qual evidência ajuda a validar um segmento de clientes?', ['Curtidas em uma publicação','Entrevistas que revelam um problema recorrente','A opinião da equipe','O número de concorrentes'],1,'Entrevistas com pessoas do segmento fornecem evidências sobre problemas, contexto e comportamento.','Segmentação'],
 ['O que caracteriza um early adopter?', ['Compra sempre o mais barato','Evita soluções novas','Sente o problema e já procura uma solução','Representa todos os clientes'],2,'Early adopters reconhecem a dor e buscam alternativas, tornando-se bons participantes de testes iniciais.','Early adopter'],
 ['Uma proposta de valor deve começar por qual elemento?', ['A tecnologia mais recente','Uma necessidade específica do cliente','O nome do produto','A estrutura da empresa'],1,'Uma proposta de valor conecta um problema relevante a um benefício que o cliente reconhece.','Proposta de valor'],
 ['Uma família paga um curso que uma adolescente frequenta. Quem é a usuária?', ['A instituição','A família','A adolescente','O banco'],2,'A adolescente utiliza o serviço. A família assume o papel de comprador nesse contexto.','Usuário e comprador'],
 ['Qual hipótese pode ser verificada em uma entrevista?', ['Nossa solução é a melhor','Todos vão querer comprar','Pequenos lojistas perdem duas horas por dia controlando estoque','O mercado é promissor'],2,'A hipótese descreve um público, um problema e uma frequência que podem ser investigados.','Segmentação'],
];
export function makeQuestions(scopes?: Draft['scopes']): Question[] {
 const selected = scopes?.filter(s=>s.selected);
 if(selected && !selected.length) return [];
 const allowed = selected ? bank.filter(b=>selected.some(s=>s.title.toLowerCase().includes(String(b[4]).toLowerCase()) || (s.title.toLowerCase().includes('segment')&&b[4]==='Segmentação'))) : bank;
 const sourceBank = allowed.length ? allowed : bank.slice(0,1);
 return Array.from({length:18},(_,i)=>{const b=sourceBank[i%sourceBank.length];const source=selected?.find(s=>s.title.toLowerCase().includes(String(b[4]).toLowerCase()))?.source||selected?.[0]?.source||'BMC_Segmento_de_Clientes.pdf · pág. 8–11';return {id:`q-${i+1}`,text:String(b[0])+(i>=sourceBank.length?` Considere o cenário ${Math.floor(i/sourceBank.length)+1} da atividade.`:''),options:b[1] as string[],correct:Number(b[2]),explanation:String(b[3]),concept:String(b[4]),source,difficulty:i%3===0?'Intermediária':i%3===1?'Básica':'Avançada',status:'Sugestão da IA'};});
}
export function freshDraft(title='Proposta de Valor',classId='empreendedorismo'):Draft { const c=classes.find(c=>c.id===classId)||classes[0];return {id:'aula-proposta',classId,title,module:c.module,duration:'45',intention:'Praticar',step:0,scopes:[{id:'s1',title:'Segmentação',source:'BMC_Segmento_de_Clientes.pdf · pág. 4–7',selected:true},{id:'s2',title:'Usuário e comprador',source:'BMC_Segmento_de_Clientes.pdf · pág. 8–11',selected:true},{id:'s3',title:'Early adopter',source:'BMC_Segmento_de_Clientes.pdf · pág. 12–14',selected:true}],objectives:[],mapApproved:false,template:'Expedição Estratégica',mode:'Equipes',competition:'Moderada',interaction:'Colaborar e competir',reward:'150 XP por checkpoint',questions:[],approved:false,published:false,previewed:false,reviewed:false}; }
export const initialState: AppState={classes,materials:[{id:'bmc',name:'BMC_Segmento_de_Clientes.pdf',type:'PDF',pages:18,size:'2,4 MB',date:'28 set 2026'},{id:'valor',name:'Proposta_de_Valor.pdf',type:'PDF',pages:24,size:'3,1 MB',date:'29 set 2026'},{id:'entrevistas',name:'Roteiro de entrevistas.docx',type:'Documento',pages:4,size:'184 KB',date:'30 set 2026'}],draft:freshDraft(),session:{id:'segmento',title:'Segmento de Clientes',classId:'empreendedorismo',template:'Expedição Estratégica',phase:0,elapsed:0,running:false,ended:false,intervention:false,ignored:false,invalid:[],events:[]},dismissed:false,profile:{name:'Helena Andrade',institution:'Faculdade Horizonte'}};
export const lessonNames=['Identificação de Problemas','Segmento de Clientes','Proposta de Valor','Validação de Hipóteses','Modelagem de Receitas','Síntese do Modelo de Negócios'];
export const phases=['Lobby','Pergunta','Movimento','Decisão','Evento','Resultado'];
export const teams=[{name:'Horizonte',color:'#6b6be8',score:1240},{name:'Pioneiros',color:'#19a89d',score:1120},{name:'Catalisadores',color:'#e9a93f',score:980},{name:'Vértice',color:'#db789c',score:860}];
