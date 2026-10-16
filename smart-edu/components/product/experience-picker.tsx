"use client";

import Image from "next/image";
import { Check, Compass, Flag, ShieldCheck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useId } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";

const experiences = [
  { name: "Expedição Estratégica", kind: "expedition", icon: Compass, description: "Rota investigativa · checkpoints e decisões em equipe", focus: "Investigar e decidir", recommended: true },
  { name: "Linha de Defesa", kind: "defense", icon: ShieldCheck, description: "Decisões sucessivas para proteger e testar uma hipótese", focus: "Testar e revisar", recommended: false },
  { name: "Conquista de Territórios", kind: "territory", icon: Flag, description: "Conquista de áreas por domínio de conceitos e estratégia", focus: "Aplicar e conectar", recommended: false },
] as const;

const experienceImages: Record<string, string> = {
  [experiences[0].name]: "/experiences/expedicao-estrategica.webp",
  [experiences[1].name]: "/experiences/linha-defesa.webp",
  [experiences[2].name]: "/experiences/conquista-territorios.webp",
};

export function ExperienceImage({ template, className = "se-experience-illustration", priority = false }: { template: string; className?: string; priority?: boolean }) {
  const source = experienceImages[template];
  if (!source) return null;
  return <Image src={source} alt={template} width={800} height={450} loading={priority ? "eager" : "lazy"} priority={priority} className={className} />;
}

export function ExperiencePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const groupId = useId();
  const reduce = useReducedMotion();
  const ordered = [...experiences.filter((item) => item.name === value), ...experiences.filter((item) => item.name !== value)];
  const transition = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 380, damping: 36 };
  return <section className="se-experience-picker" aria-labelledby="experience-picker-heading">
    <div className="se-experience-heading"><h3 id="experience-picker-heading">Escolha a dinâmica da aula</h3><p>O formato organiza as decisões. Os objetivos orientam o percurso.</p></div>
    <LayoutGroup id={groupId}><RadioGroup className="se-experience-options" value={value} onValueChange={onChange} aria-labelledby="experience-picker-heading">
      {ordered.map((experience) => {
        const selected = value === experience.name;
        const Icon = experience.icon;
        const id = `${groupId}-experience-${experience.kind}`;
        return <motion.label layout={!reduce} whileHover={reduce ? undefined : { y: -4 }} whileTap={reduce ? undefined : { scale: .99 }} transition={transition} style={{ borderRadius: 14 }} key={experience.kind} htmlFor={id} className={`se-experience-option experience-${experience.kind}${selected ? " is-selected" : ""}`}>
          <div className="se-experience-option-top"><span><Icon size={15} />{experience.focus}</span><RadioGroupItem value={experience.name} id={id} aria-label={experience.name} className="se-experience-radio" /></div>
          <motion.div layout={reduce ? false : "position"} transition={transition} className="se-experience-art"><ExperienceImage template={experience.name} priority={selected} /></motion.div>
          <motion.div layout={reduce ? false : "position"} transition={transition} className="se-experience-copy"><strong>{experience.name}</strong><p>{experience.description}</p>{selected && <span className="se-experience-current">Dinâmica escolhida para a aula</span>}</motion.div>
          <div className="se-experience-option-footer"><span>{experience.recommended ? "Recomendado para esta aula" : "Formato disponível"}</span><span className="se-experience-selection">{selected && <Check size={13} />}{selected ? "Selecionada" : "Selecionar"}</span></div>
        </motion.label>;
      })}
    </RadioGroup></LayoutGroup>
  </section>;
}
