'use client';

import { useRef, useState } from 'react';
import { BookOpen, Check, FileText, Plus, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useStore, updateStore, updateDraft } from '@/lib/store';
import type { Material } from '@/data/model';
import { Badge, Empty, PageHead, SearchBox } from './ui';

export function Materials({ selectable = false }: { selectable?: boolean }) {
  const store = useStore();
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [textOpen, setTextOpen] = useState(false);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState<Material | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const list = store.materials.filter(material => material.name.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')));

  function select(material: Material) {
    if (!selectable) { setDetail(material); return; }
    updateDraft({
      scopes: material.id === 'bmc'
        ? [
            { id: 's1', title: 'Segmentação', source: `${material.name} · pág. 4–7`, selected: true },
            { id: 's2', title: 'Usuário e comprador', source: `${material.name} · pág. 8–11`, selected: true },
            { id: 's3', title: 'Early adopter', source: `${material.name} · pág. 12–14`, selected: true },
          ]
        : [{ id: `s-${material.id}`, title: material.id === 'valor' ? 'Proposta de valor' : material.text?.slice(0, 70) || 'Trecho selecionado pelo professor', source: `${material.name} · escopo definido pelo professor`, selected: true }],
      objectives: [], mapApproved: false, questions: [],
    });
    toast.success('Material selecionado. Revise o escopo abaixo.');
  }

  async function upload(file?: File) {
    if (!file || busy) return;
    setUploadError('');
    setUploadStatus('');
    if (!/\.(pdf|pptx?|docx?|txt)$/i.test(file.name)) {
      setUploadError('Este formato não é aceito. Selecione PDF, slides, documento ou texto.');
      toast.error('Selecione PDF, slides, documento ou texto.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setUploadError('O arquivo ultrapassa o limite de 20 MB. Escolha um arquivo menor.');
      toast.error('Use um arquivo de até 20 MB na demonstração.');
      return;
    }

    setBusy(true);
    setUploadStatus(`Preparando ${file.name}.`);
    try {
      const content = /\.txt$/i.test(file.name) ? await file.text() : '';
      await new Promise(resolve => window.setTimeout(resolve, 700));
      const material: Material = {
        id: `m-${Date.now()}`,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'Arquivo',
        size: `${(file.size / 1024).toFixed(0)} KB`,
        pages: 0,
        date: '02 out 2026',
        text: content,
      };
      updateStore(current => ({ ...current, materials: [material, ...current.materials] }));
      setUploadStatus(`${file.name} adicionado à biblioteca de demonstração.`);
      toast.success('Material adicionado à demonstração. Defina o escopo manualmente.');
      if (selectable) select(material);
    } catch {
      setUploadError(`Não foi possível ler ${file.name}. Tente selecionar o arquivo novamente.`);
      setUploadStatus('');
      toast.error('Não foi possível preparar o material. Tente novamente.');
    } finally {
      setBusy(false);
    }
  }

  return <>
    {!selectable && <PageHead eyebrow="SUA BIBLIOTECA PEDAGÓGICA" title="Materiais" description="Fontes que dão contexto às experiências de aprendizagem.">
      <button type="button" className="btn primary" onClick={() => fileRef.current?.click()}><Plus size={17} aria-hidden="true" />Adicionar material</button>
    </PageHead>}
    <div className="upload-zone" onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); void upload(event.dataTransfer.files[0]); }}>
      <Upload size={27} aria-hidden="true" />
      <h3>{busy ? 'Preparando material…' : 'Traga o conteúdo da próxima aula'}</h3>
      <p>Arraste um arquivo ou selecione no computador.</p>
      <div className="actions">
        <button type="button" disabled={busy} className="btn secondary small" onClick={() => fileRef.current?.click()}>Selecionar arquivo</button>
        <button type="button" className="text-link" onClick={() => setTextOpen(true)}>Adicionar texto</button>
      </div>
      <span className="small muted">PDF, slides, documento ou texto · até 20 MB · processamento simulado</span>
      <input type="file" ref={fileRef} className="sr-only" aria-label="Selecionar material para enviar" accept=".pdf,.ppt,.pptx,.doc,.docx,.txt" disabled={busy} onChange={event => { void upload(event.target.files?.[0]); event.target.value = ''; }} />
      <p role="status" aria-live="polite" aria-atomic="true">{uploadStatus || (busy ? 'Preparando material…' : '')}</p>
      {uploadError && <p role="alert">{uploadError}</p>}
    </div>
    <div className="toolbar"><SearchBox value={query} onChange={setQuery} placeholder="Buscar material na biblioteca…" /><span className="small muted" aria-live="polite">{list.length} materiais</span></div>
    <div className="material-list" aria-label="Materiais da biblioteca">
      {list.map(material => <button type="button" key={material.id} className="material-row" onClick={() => select(material)}>
        <span className="file-icon" aria-hidden="true"><FileText size={23} /><small>{material.type}</small></span>
        <span className="material-info"><strong>{material.name}</strong><span>{material.pages ? `${material.pages} páginas · ` : ''}{material.size} · {material.date}</span></span>
        <Badge tone={selectable && store.draft.scopes.some(scope => scope.source.startsWith(material.name)) ? 'teal' : 'neutral'}>{selectable ? (store.draft.scopes.some(scope => scope.source.startsWith(material.name)) ? <><Check size={12} aria-hidden="true" />Selecionado</> : 'Selecionar') : 'Ver material'}</Badge>
      </button>)}
    </div>
    {!list.length && <Empty title={query ? 'Nenhum material encontrado' : 'Sua biblioteca está vazia'} description={query ? 'Ajuste o termo da busca ou adicione outro material.' : 'Adicione um arquivo ou texto para começar sua biblioteca.'}><button type="button" className="btn secondary" onClick={() => query ? setQuery('') : fileRef.current?.click()}>{query ? 'Limpar busca' : 'Selecionar arquivo'}</button></Empty>}
    <Dialog open={textOpen} onOpenChange={setTextOpen}><DialogContent>
      <DialogTitle>Adicionar conteúdo em texto</DialogTitle><DialogDescription>O trecho será guardado neste navegador como material da aula.</DialogDescription>
      <label className="field">Nome do material<input required maxLength={120} value={title} onChange={event => setTitle(event.target.value)} /></label>
      <label className="field">Conteúdo<textarea required maxLength={20000} value={text} onChange={event => setText(event.target.value)} rows={7} /></label>
      <p className="small muted">Informe um nome e o conteúdo. Limite: 20.000 caracteres.</p>
      <button type="button" className="btn primary" disabled={!title.trim() || !text.trim()} onClick={() => {
        const material: Material = { id: `texto-${Date.now()}`, name: title.trim(), type: 'Texto', pages: 1, size: `${text.length} caracteres`, date: '02 out 2026', text };
        updateStore(current => ({ ...current, materials: [material, ...current.materials] }));
        setTextOpen(false); setTitle(''); setText('');
        if (selectable) select(material);
        toast.success('Texto adicionado.');
      }}>Salvar material</button>
    </DialogContent></Dialog>
    <Dialog open={Boolean(detail)} onOpenChange={open => { if (!open) setDetail(null); }}><DialogContent>
      <DialogTitle>{detail?.name}</DialogTitle><DialogDescription>Fonte da biblioteca demonstrativa</DialogDescription><BookOpen size={30} aria-hidden="true" />
      <p>{detail?.text || 'Material de referência do cenário: definição de segmentos de clientes, distinção entre usuário e comprador e identificação de early adopters. Os arquivos de exemplo não possuem um PDF original anexado.'}</p>
      <p className="small muted">{detail?.pages ? `${detail.pages} páginas · ` : ''}{detail?.size}</p>
    </DialogContent></Dialog>
  </>;
}
