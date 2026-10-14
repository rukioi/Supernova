import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import assert from 'node:assert/strict';

const { chromium } = await import(pathToFileURL(process.argv[2]).href);
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
fs.mkdirSync('artifacts/preview', { recursive: true });
const names = ['Expedição Estratégica', 'Linha de Defesa', 'Conquista de Territórios'];
const kinds = ['expedition', 'defense', 'territory'];
const phases = ['Lobby','Pergunta','Movimento','Decisão','Evento','Resultado'];
async function phase(name) {
  await page.locator('.pv-phase-list').getByRole('button', { name: new RegExp(name) }).click();
  await page.locator('.pv-stage').filter({ has: page.locator('.pv-phase-heading .pv-eyebrow', { hasText: name }) }).waitFor();
  await page.waitForTimeout(250);
}
async function open() {
  await page.getByRole('button', { name: 'Visualizar experiência', exact: true }).click();
  await page.getByRole('dialog', { name: 'Visualizar experiência', exact: true }).waitFor();
}
try {
  await page.goto('http://127.0.0.1:5173/preparar-aula', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByText('Etapa 2 de 7', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByText('Etapa 3 de 7', { exact: true }).waitFor();
  await page.getByRole('button', { name: /Aprovar mapa/ }).click();
  await page.locator('.se-stepper').getByRole('button', { name: /Revisão/ }).click();
  await page.getByText('Etapa 6 de 7', { exact: true }).waitFor();
  const before = await page.evaluate(() => JSON.parse(localStorage.getItem('smart-edu-demo-v1')));
  await open();
  assert(page.url().endsWith('/preparar-aula'));
  assert.equal(browser.contexts()[0].pages().length, 1);
  assert.equal(await page.locator('.pv-structure dd').nth(0).textContent(), '4');
  assert.equal(await page.locator('.pv-structure dd').nth(1).textContent(), '12');
  await page.getByRole('radio', { name: 'Aluno', exact: true }).focus();
  await page.keyboard.press('ArrowRight', { delay: 50 });
  await page.getByRole('radio', { name: 'Telão', exact: true, checked: true }).waitFor();
  assert.equal(await page.getByRole('radio', { name: 'Telão', exact: true }).getAttribute('aria-checked'), 'true');
  await page.keyboard.press('ArrowLeft', { delay: 50 });
  await page.getByRole('radio', { name: 'Aluno', exact: true, checked: true }).waitFor();
  for (let index=0; index<18; index++) {
    await page.keyboard.press('Tab');
    assert(await page.locator('.pv-dialog').evaluate(el => el.contains(document.activeElement)));
  }
  for (let format = 0; format < names.length; format++) {
    await page.getByRole('radio', { name: names[format], exact: true }).click();
    assert.equal(await page.locator('[data-board]').getAttribute('data-board'), kinds[format]);
    for (const perspective of ['Aluno','Telão','Professor']) {
      await page.getByRole('radio', { name: perspective, exact: true }).check();
      for (const name of phases) {
        await phase(name);
        assert.equal(await page.locator('.pv-stage').getAttribute('data-phase'), name);
        assert.equal(await page.locator('.pv-phase-list [aria-current=step]').count(), 1);
        assert.equal(await page.locator('.pv-controls').getByRole('radio', { checked: true }).count(), 2);
      }
      if (perspective === 'Telão') {
        await phase('Pergunta');
        assert.equal(await page.locator('.pv-choices').count(), 0);
        assert.equal(await page.locator('.pv-collective-options li').count(), 4);
      }
    }
    await page.getByRole('radio', { name: 'Aluno', exact: true }).check();
    await phase('Pergunta');
    await page.getByRole('button', { name: 'Confirmar resposta', exact: true }).isDisabled().then(assert);
    await page.getByRole('radiogroup', { name: 'Alternativas da questão' }).getByRole('radio').nth(1).check();
    await page.getByRole('button', { name: 'Confirmar resposta', exact: true }).click();
    await page.getByText('Um ponto para revisar.', { exact: true }).waitFor();
    await page.getByRole('radiogroup', { name: 'Alternativas da questão' }).getByRole('radio').nth(0).check();
    await page.getByRole('button', { name: 'Confirmar resposta', exact: true }).click();
    await page.getByText('Conceito reconhecido. Agora aplique.', { exact: true }).waitFor();
    await phase('Movimento');
    await page.locator('.pv-choices').getByRole('radio').first().check();
    await phase('Decisão');
    await page.getByRole('radiogroup', { name: 'Decisão da equipe' }).getByRole('radio').nth(1).check();
    assert(await page.getByRole('button', { name: 'Confirmar decisão', exact: true }).isDisabled());
    await page.getByRole('textbox', { name: 'Justificativa da equipe' }).fill('O argumento precisa de evidência observável no contexto do caso.');
    await page.getByRole('button', { name: 'Confirmar decisão', exact: true }).click();
    const bad = await page.locator('.pv-feedback').textContent();
    await page.getByRole('radiogroup', { name: 'Decisão da equipe' }).getByRole('radio').nth(0).check();
    await page.getByRole('button', { name: 'Confirmar decisão', exact: true }).click();
    const good = await page.locator('.pv-feedback').textContent();
    assert.notEqual(good, bad);
    await phase('Evento');
    await page.getByRole('radiogroup', { name: 'Resposta ao evento' }).getByRole('radio').first().check();
    await phase('Resultado');
    assert.equal(await page.locator('.pv-result-grid b').first().textContent(), '450 XP');
    assert.equal(await page.locator('.pv-result-grid b').last().textContent(), '3 registros');
    await page.getByRole('radio', { name: 'Professor', exact: true }).check();
    await page.getByText('Intenção pedagógica', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Pausar e explicar', exact: true }).click();
    await page.locator('.pv-paused').waitFor();
    await page.getByRole('button', { name: 'Retomar simulação', exact: true }).click();
    await page.getByRole('radio', { name: 'Aluno', exact: true }).check();
    await phase('Lobby');
    await page.locator('.pv-dialog-body').evaluate(el => { el.scrollTop = 0; });
    await page.screenshot({ path: `artifacts/preview/${kinds[format]}-1440.png` });
  }
  const after = await page.evaluate(() => JSON.parse(localStorage.getItem('smart-edu-demo-v1')));
  assert.deepEqual(after, { ...before, draft: { ...before.draft, previewed: true } });
  for (const viewport of [{width:1024,height:768},{width:390,height:844}]) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(300);
    const bounds = await page.locator('.pv-dialog').boundingBox();
    assert(bounds.x >= 0 && bounds.y >= 0 && bounds.x+bounds.width <= viewport.width+1 && bounds.y+bounds.height <= viewport.height+1, JSON.stringify(bounds));
    assert(await page.locator('.pv-dialog-body').evaluate(el => el.scrollWidth <= el.clientWidth+1));
    for (const name of ['Perspectiva','Simular fase','Formato de experiência','Estrutura pedagógica']) assert(await page.locator('.pv-workbench').getByRole('heading', { name, exact: true }).isVisible());
    await page.getByRole('radio', { name: 'Linha de Defesa', exact: true }).check();
    await phase('Decisão');
    await page.locator('.pv-dialog-body').evaluate(el => { el.scrollTop = 0; });
    await page.screenshot({ path: `artifacts/preview/modal-${viewport.width}.png` });
  }
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  assert(page.url().endsWith('/preparar-aula'));
  assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Visualizar experiência');
  await open();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await phase('Evento');
  assert(await page.locator('.pv-phase-body').evaluate(el => getComputedStyle(el.firstElementChild).transform === 'none'));
  await page.getByRole('button', { name: 'Voltar à revisão', exact: true }).click();
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  await page.evaluate(() => {
    const state = JSON.parse(localStorage.getItem('smart-edu-demo-v1'));
    state.draft.objectives = state.draft.objectives.slice(0,2);
    state.draft.questions = [{ id: 'custom', text: 'Questão editada pelo professor: qual hipótese pode ser testada?', options: ['Afirmação observável','Opinião sem evidência'], correct: 0, explanation: 'Uma hipótese precisa de uma evidência que a possa refutar.', concept: 'Validação', source: 'Material revisado · página 9', difficulty: 'Básica', status: 'Editado pelo professor' }];
    state.draft.selectedQuestionIds = ['custom'];
    state.draft.mode = 'Individual';
    state.draft.template = 'Linha de Defesa';
    localStorage.setItem('smart-edu-demo-v1',JSON.stringify(state));
  });
  await page.reload({ waitUntil: 'networkidle' });
  await open();
  assert.equal(await page.locator('[data-board]').getAttribute('data-board'), 'defense');
  assert.equal(await page.locator('.pv-structure dd').nth(0).textContent(), '2');
  assert.equal(await page.locator('.pv-structure dd').nth(1).textContent(), '1');
  await phase('Pergunta');
  await page.getByText('Questão editada pelo professor: qual hipótese pode ser testada?', { exact: true }).waitFor();
  assert.equal(await page.locator('.pv-choices').getByRole('radio').count(), 2);
  await page.getByRole('button', { name: 'Fechar prévia', exact: true }).click();
  await page.evaluate(() => { const state=JSON.parse(localStorage.getItem('smart-edu-demo-v1')); state.draft.selectedQuestionIds=[]; localStorage.setItem('smart-edu-demo-v1',JSON.stringify(state)); });
  await page.reload({ waitUntil: 'networkidle' });
  await open(); await phase('Pergunta');
  await page.getByText('Nenhuma questão selecionada.', { exact: true }).waitFor();
  assert.equal(await page.locator('.pv-structure dd').nth(1).textContent(), '0');
  await page.getByRole('button', { name: 'Fechar prévia', exact: true }).click();
  await page.evaluate(() => { const state=JSON.parse(localStorage.getItem('smart-edu-demo-v1')); state.draft.reward='Sem pontuação'; localStorage.setItem('smart-edu-demo-v1',JSON.stringify(state)); });
  await page.reload({ waitUntil: 'networkidle' });
  await open(); await phase('Resultado');
  assert.equal(await page.locator('.pv-result-grid b').first().textContent(), 'Sem pontuação');
  await page.getByRole('button', { name: 'Fechar prévia', exact: true }).click();
  await page.goto('http://127.0.0.1:5173/experiencia/segmento-de-clientes', { waitUntil: 'networkidle' });
  await page.locator('[data-board=defense]').waitFor();
  assert.equal(await page.locator('.pv-structure dd').nth(1).textContent(), '0');
  assert.deepEqual(errors, []);
  console.log('PASS: 54 format/phase/perspective combinations; form feedback and consequences; modal without navigation; draft isolation; responsive bounds; Escape/focus; reduced motion; edited content and empty selection.');
} finally { await browser.close(); }
