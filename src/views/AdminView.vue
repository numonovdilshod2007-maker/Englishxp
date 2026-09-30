<template>
  <div class="admin-page">
    <AuroraBackground />
    <AppNav />
    <main class="container admin-content">
      <section class="admin-hero glass">
        <div>
          <span class="eyebrow"><i class="ti ti-shield-lock"></i> ENGLISHXP STUDIO</span>
          <h1>Admin Content Studio</h1>
          <p>Kodsiz ishlang: yangi dars, savol, so‘z, audio matn, IELTS material yoki hikoya qo‘shing. Saqlagan zahoti Firestore'ga tushadi — yangi deploy kerak emas.</p>
        </div>
        <div class="admin-hero-badge"><i class="ti ti-database"></i><strong>{{ contentStore.totalCustomContent }}</strong><span>custom content</span></div>
      </section>

      <div class="admin-tabs glass">
        <button v-for="item in tabs" :key="item.id" :class="['admin-tab', { active: tab === item.id }]" @click="tab = item.id">
          <i :class="['ti', item.icon]"></i><span>{{ item.label }}</span>
        </button>
      </div>

      <section v-if="tab === 'overview'" class="admin-stack">
        <div class="admin-grid three">
          <Metric icon="ti-users" label="Foydalanuvchilar" :value="contentStore.userCount ?? '—'" />
          <Metric icon="ti-bolt" label="Jami XP" :value="format(contentStore.totalXp)" />
          <Metric icon="ti-crown" label="Pro" :value="`${contentStore.proCount ?? '—'} · ${contentStore.proConversionPercent ?? '—'}%`" />
        </div>
        <div class="glass admin-panel">
          <div class="panel-head"><div><h2>Content map</h2><p>Qaysi bo‘limga nechta custom material qo‘shilganini ko‘ring.</p></div><button class="btn-secondary" @click="refreshAll"><i class="ti ti-refresh"></i> Yangilash</button></div>
          <div class="content-map">
            <div v-for="item in contentMap" :key="item.label" class="content-map-row"><div><i :class="['ti', item.icon]"></i><span>{{ item.label }}</span></div><strong>{{ item.count }}</strong></div>
          </div>
        </div>
        <div class="glass admin-panel admin-tip">
          <div class="tip-icon">💡</div>
          <div><h2>Qanday ishlaydi?</h2><p>Masalan, Vocabulary'ga 20 ta so‘z qo‘shing. Ular mavjud lesson engine ichiga qo‘shiladi. Grammar'da esa bitta mavzu ichiga istalgancha test savollari qo‘shishingiz mumkin.</p></div>
        </div>
      </section>

      <section v-else-if="tab === 'words'"><ContentHeader icon="ti-abc" title="Vocabulary" text="Yangi so‘zlarni level bo‘yicha qo‘shing. Edit/Delete ham mavjud."/><WordEditor :items="contentStore.customWordDocs" :initial="wordForm" :saving="saving" @save="saveWord" @edit="editWord" @delete="deleteWord"/></section>

      <section v-else-if="tab === 'grammar'"><ContentHeader icon="ti-abc-2" title="Grammar" text="Har bir mavzuga qoida, misol va ko‘p test qo‘shing."/><GrammarEditor :items="contentStore.customGrammarDocs" :initial="grammarForm" :saving="saving" @save="saveGrammar" @edit="editGrammar" @delete="deleteGrammar"/></section>

      <section v-else-if="tab === 'listening'"><ContentHeader icon="ti-headphones" title="Listening" text="Audio matn va bir nechta savolni bitta listening set qilib saqlang."/><ListeningEditor :items="contentStore.customListeningDocs" :initial="listeningForm" :saving="saving" @save="saveListening" @edit="editListening" @delete="deleteListening"/></section>

      <section v-else-if="tab === 'writing'"><ContentHeader icon="ti-pencil" title="Writing" text="Uzbek prompt va bir nechta qabul qilinadigan English javoblarni qo‘shing."/><WritingEditor :items="contentStore.customWritingDocs" :initial="writingForm" :saving="saving" @save="saveWriting" @edit="editWriting" @delete="deleteWriting"/></section>

      <section v-else-if="tab === 'stories'"><ContentHeader icon="ti-book-2" title="Stories" text="Qisqa hikoya, gaplar va comprehension savollarini kodsiz kiriting."/><StoryEditor :items="contentStore.customStoryDocs" :initial="storyForm" :saving="saving" @save="saveStory" @edit="editStory" @delete="deleteStory"/></section>

      <section v-else-if="tab === 'ielts'">
        <ContentHeader icon="ti-target-arrow" title="IELTS Studio" text="Reading, Listening, Writing Task 1/2 va Speaking setlarini alohida boshqaring."/>
        <div class="subtabs glass"><button v-for="s in ieltsTabs" :key="s.id" :class="{active: ieltsTab===s.id}" @click="ieltsTab=s.id"><i :class="['ti',s.icon]"></i>{{s.label}}</button></div>
        <IeltsEditor :mode="ieltsTab" :items="ieltsItems" :initial="ieltsForm" :saving="saving" @save="saveIelts" @edit="editIelts" @delete="deleteIelts"/>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useContentStore } from '../stores/contentStore.js'
import { maxLevel } from '../data/vocabulary.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import Metric from '../components/admin/Metric.vue'
import ContentHeader from '../components/admin/ContentHeader.vue'
import WordEditor from '../components/admin/WordEditor.vue'
import GrammarEditor from '../components/admin/GrammarEditor.vue'
import ListeningEditor from '../components/admin/ListeningEditor.vue'
import WritingEditor from '../components/admin/WritingEditor.vue'
import StoryEditor from '../components/admin/StoryEditor.vue'
import IeltsEditor from '../components/admin/IeltsEditor.vue'

const contentStore = useContentStore()
const tab = ref('overview')
const ieltsTab = ref('reading')
const saving = ref(false)
const editing = ref({ type: null, id: null })

const tabs = [
  { id:'overview', label:'Overview', icon:'ti-layout-dashboard' },
  { id:'words', label:'Vocabulary', icon:'ti-abc' },
  { id:'grammar', label:'Grammar', icon:'ti-abc-2' },
  { id:'listening', label:'Listening', icon:'ti-headphones' },
  { id:'writing', label:'Writing', icon:'ti-pencil' },
  { id:'stories', label:'Stories', icon:'ti-book-2' },
  { id:'ielts', label:'IELTS', icon:'ti-target-arrow' }
]
const ieltsTabs = [
  { id:'reading', label:'Reading', icon:'ti-book' },
  { id:'ieltsListening', label:'Listening', icon:'ti-headphones' },
  { id:'task1', label:'Task 1', icon:'ti-chart-bar' },
  { id:'task2', label:'Task 2', icon:'ti-pencil' },
  { id:'speaking', label:'Speaking', icon:'ti-microphone-2' }
]
const emptyWord=()=>({level:1,en:'',uz:'',example:'',exampleUz:''})
const emptyGrammar=()=>({level:1,title:'',titleEn:'',pointsRaw:'',examplesRaw:'',exercisesRaw:''})
const emptyListening=()=>({level:1,title:'',script:'',questionsRaw:''})
const emptyWriting=()=>({level:1,title:'',promptsRaw:''})
const emptyStory=()=>({title:'',titleEn:'',cefr:'A1',level:1,minutes:3,sentencesRaw:'',questionsRaw:''})
const emptyIelts={reading:{id:'',title:'',text:'',questionsRaw:''},ieltsListening:{id:'',context:'',script:'',questionsRaw:''},task1:{id:'',title:'',instruction:'',columnsRaw:'',rowsRaw:''},task2:{id:'',prompt:''},speaking:{id:'',title:'',part1Raw:'',cue:'',pointsRaw:'',part3Raw:''}}
const wordForm=ref(emptyWord()), grammarForm=ref(emptyGrammar()), listeningForm=ref(emptyListening()), writingForm=ref(emptyWriting()), storyForm=ref(emptyStory()), ieltsForm=ref({...emptyIelts.reading})
watch(ieltsTab, (mode) => { editing.value = { type: null, id: null }; ieltsForm.value = { ...emptyIelts[mode] } })

const contentMap = computed(()=>[
  {label:'Vocabulary',icon:'ti-abc',count:contentStore.customWordDocs.length},
  {label:'Grammar',icon:'ti-abc-2',count:contentStore.customGrammarDocs.length},
  {label:'Listening',icon:'ti-headphones',count:contentStore.customListeningDocs.length},
  {label:'Writing',icon:'ti-pencil',count:contentStore.customWritingDocs.length},
  {label:'Stories',icon:'ti-book-2',count:contentStore.customStoryDocs.length},
  {label:'IELTS Reading',icon:'ti-book',count:contentStore.customIeltsReadingDocs.length},
  {label:'IELTS Listening',icon:'ti-headphones',count:contentStore.customIeltsListeningDocs.length},
  {label:'IELTS Task 1',icon:'ti-chart-bar',count:contentStore.customIeltsTask1Docs.length},
  {label:'IELTS Task 2',icon:'ti-pencil',count:contentStore.customIeltsTask2Docs.length},
  {label:'IELTS Speaking',icon:'ti-microphone-2',count:contentStore.customIeltsSpeakingDocs.length}
])
const ieltsItems = computed(()=>({reading:contentStore.customIeltsReadingDocs,ieltsListening:contentStore.customIeltsListeningDocs,task1:contentStore.customIeltsTask1Docs,task2:contentStore.customIeltsTask2Docs,speaking:contentStore.customIeltsSpeakingDocs}[ieltsTab.value]))
function format(n){return n == null ? '—' : Number(n).toLocaleString('en-US')}
function parseLines(raw){return raw.split('\n').map(x=>x.trim()).filter(Boolean)}
function parsePipe(raw, min=2){return parseLines(raw).map(line=>line.split('|').map(x=>x.trim())).filter(parts=>parts.length>=min)}
function parseGrammarForm(f){return {level:Number(f.level),title:f.title.trim(),titleEn:f.titleEn.trim(),points:parseLines(f.pointsRaw),examples:parsePipe(f.examplesRaw).map(p=>({en:p[0],uz:p[1]})),exercises:parsePipe(f.exercisesRaw,5).map(p=>({question:p[0],options:p.slice(1,-1),correct:p[p.length-1]}))}}
function parseListeningForm(f){return {level:Number(f.level),title:f.title.trim(),items:[{script:f.script.trim(),questions:parsePipe(f.questionsRaw,3).map(p=>({question:p[0],options:p.slice(1,-1),correct:p[p.length-1]}))}]}}
function parseWritingForm(f){return {level:Number(f.level),title:f.title.trim(),prompts:parsePipe(f.promptsRaw).map(p=>({uz:p[0],accepted:p.slice(1)}))}}
function parseStoryForm(f){return {level:Number(f.level),cefr:f.cefr,title:f.title.trim(),titleEn:f.titleEn.trim(),minutes:Number(f.minutes),icon:'ti-book-2',sentences:parsePipe(f.sentencesRaw).map(p=>({en:p[0],uz:p[1]})),questions:parsePipe(f.questionsRaw,3).map(p=>({question:p[0],options:p.slice(1,-1),correct:p[p.length-1]}))}}
function parseIelts(mode,f){
  if(mode==='reading') return {id:f.id||`custom-reading-${Date.now()}`,title:f.title.trim(),text:f.text.trim(),questions:parsePipe(f.questionsRaw,5).map(p=>({type:p[0],question:p[1],options:p.slice(2,-1),correct:p[p.length-1]}))}
  if(mode==='ieltsListening') return {id:f.id||`custom-listening-${Date.now()}`,context:f.context.trim(),script:f.script.trim(),questions:parsePipe(f.questionsRaw,5).map(p=>({question:p[0],options:p.slice(1,-1),correct:p[p.length-1]}))}
  if(mode==='task1') return {id:f.id||`custom-task1-${Date.now()}`,title:f.title.trim(),instruction:f.instruction.trim(),columns:parseLines(f.columnsRaw),rows:parseLines(f.rowsRaw).map(r=>r.split('|').map(x=>x.trim()))}
  if(mode==='task2') return {id:f.id||`custom-task2-${Date.now()}`,prompt:f.prompt.trim()}
  return {id:f.id||`custom-speaking-${Date.now()}`,title:f.title.trim(),part1:parseLines(f.part1Raw),part2:{cue:f.cue.trim(),points:parseLines(f.pointsRaw)},part3:parseLines(f.part3Raw)}
}
function fillForm(type,item){
  if(type==='word') wordForm.value={level:item.level,en:item.en,uz:item.uz,example:item.example||'',exampleUz:item.exampleUz||''}
  if(type==='grammar'){const g=item.grammar; grammarForm.value={level:g.level,title:g.title,titleEn:g.titleEn,pointsRaw:(g.points||[]).join('\n'),examplesRaw:(g.examples||[]).map(x=>`${x.en} | ${x.uz}`).join('\n'),exercisesRaw:(g.exercises||[]).map(x=>`${x.question} | ${x.options.join(' | ')} | ${x.correct}`).join('\n')}}
  if(type==='listening'){const g=item.listening; const it=g.items?.[0]||{}; listeningForm.value={level:g.level,title:g.title,script:it.script||'',questionsRaw:(it.questions||[]).map(x=>`${x.question} | ${x.options.join(' | ')} | ${x.correct}`).join('\n')}}
  if(type==='writing'){const w=item.writing; writingForm.value={level:w.level,title:w.title,promptsRaw:(w.prompts||[]).map(x=>`${x.uz} | ${x.accepted.join(' | ')}`).join('\n')}}
  if(type==='story'){const s=item.story; storyForm.value={title:s.title,titleEn:s.titleEn,cefr:s.cefr,level:s.level,minutes:s.minutes,sentencesRaw:(s.sentences||[]).map(x=>`${x.en} | ${x.uz}`).join('\n'),questionsRaw:(s.questions||[]).map(x=>`${x.question} | ${x.options.join(' | ')} | ${x.correct}`).join('\n')}}
  if(type==='ielts') ieltsForm.value={...item}
}
function cancelEdit(){editing.value={type:null,id:null}; wordForm.value=emptyWord(); grammarForm.value=emptyGrammar(); listeningForm.value=emptyListening(); writingForm.value=emptyWriting(); storyForm.value=emptyStory(); ieltsForm.value={...emptyIelts[ieltsTab.value]}}
async function saveWord(payload){saving.value=true;try{editing.value.id?await contentStore.updateCustomWord(editing.value.id,payload):await contentStore.addCustomWord(payload);cancelEdit()}finally{saving.value=false}}
async function saveGrammar(form){saving.value=true;try{const payload=parseGrammarForm(form);editing.value.id?await contentStore.updateCustomGrammar(editing.value.id,payload):await contentStore.addCustomGrammar(payload);cancelEdit()}finally{saving.value=false}}
async function saveListening(form){saving.value=true;try{const payload=parseListeningForm(form);editing.value.id?await contentStore.updateCustomListening(editing.value.id,payload):await contentStore.addCustomListening(payload);cancelEdit()}finally{saving.value=false}}
async function saveWriting(form){saving.value=true;try{const payload=parseWritingForm(form);editing.value.id?await contentStore.updateCustomWriting(editing.value.id,payload):await contentStore.addCustomWriting(payload);cancelEdit()}finally{saving.value=false}}
async function saveStory(form){saving.value=true;try{const payload=parseStoryForm(form);editing.value.id?await contentStore.updateCustomStory(editing.value.id,payload):await contentStore.addCustomStory(payload);cancelEdit()}finally{saving.value=false}}
async function saveIelts(form){saving.value=true;try{const payload=parseIelts(ieltsTab.value,form);editing.value.id?await contentStore.updateCustomIelts(ieltsTab.value,editing.value.id,payload):await contentStore.addCustomIelts(ieltsTab.value,payload);cancelEdit()}finally{saving.value=false}}
function editWord(item){editing.value={type:'word',id:item.id};fillForm('word',item);tab.value='words'}
function editGrammar(item){editing.value={type:'grammar',id:item.id};fillForm('grammar',item);tab.value='grammar'}
function editListening(item){editing.value={type:'listening',id:item.id};fillForm('listening',item);tab.value='listening'}
function editWriting(item){editing.value={type:'writing',id:item.id};fillForm('writing',item);tab.value='writing'}
function editStory(item){editing.value={type:'story',id:item.id};fillForm('story',item);tab.value='stories'}
function editIelts(item){editing.value={type:'ielts',id:item.id};fillForm('ielts',item.item);}
async function deleteWord(id){if(confirm('Bu so‘zni o‘chirishni tasdiqlaysizmi?'))await contentStore.deleteCustomWord(id)}
async function deleteGrammar(id){if(confirm('Bu grammar mavzusini o‘chirishni tasdiqlaysizmi?'))await contentStore.deleteCustomGrammar(id)}
async function deleteListening(id){if(confirm('Bu listening setni o‘chirishni tasdiqlaysizmi?'))await contentStore.deleteCustomListening(id)}
async function deleteWriting(id){if(confirm('Bu writing setni o‘chirishni tasdiqlaysizmi?'))await contentStore.deleteCustomWriting(id)}
async function deleteStory(id){if(confirm('Bu hikoyani o‘chirishni tasdiqlaysizmi?'))await contentStore.deleteCustomStory(id)}
async function deleteIelts(id){if(confirm('Bu IELTS materialni o‘chirishni tasdiqlaysizmi?'))await contentStore.deleteCustomIelts(ieltsTab.value,id)}
async function refreshAll(){await Promise.all([contentStore.fetchCustomContent(true),contentStore.fetchStats()])}
onMounted(refreshAll)
</script>

<style scoped>
.admin-page{min-height:100vh;padding-bottom:70px}.admin-content{max-width:1180px;padding-top:28px}.admin-hero{padding:28px;display:flex;align-items:center;justify-content:space-between;gap:22px;margin-bottom:18px}.eyebrow{display:inline-flex;gap:7px;align-items:center;font-size:11px;font-weight:900;letter-spacing:.12em;color:#7f8cff}.admin-hero h1{font:800 32px/1.1 Manrope,sans-serif;margin:10px 0 8px}.admin-hero p{max-width:760px;color:var(--text-secondary);font-size:13px;line-height:1.6;margin:0}.admin-hero-badge{min-width:145px;padding:18px;border:1px solid var(--border-glass);border-radius:22px;background:rgba(111,124,255,.08);display:flex;flex-direction:column;align-items:center}.admin-hero-badge i{font-size:22px;color:#7f8cff}.admin-hero-badge strong{font-size:30px;margin-top:4px}.admin-hero-badge span{font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.08em}.admin-tabs{display:flex;gap:6px;padding:8px;margin-bottom:20px;overflow:auto}.admin-tab{display:flex;align-items:center;gap:8px;border:0;background:transparent;color:var(--text-secondary);padding:11px 14px;border-radius:14px;font-size:12px;font-weight:800;white-space:nowrap}.admin-tab:hover{background:var(--surface-glass)}.admin-tab.active{background:#6f7cff;color:white}.admin-grid.three{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.admin-stack{display:flex;flex-direction:column;gap:18px}.admin-panel{padding:22px}.panel-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.panel-head h2,.admin-tip h2{margin:0 0 5px;font:800 17px/1.2 Manrope,sans-serif}.panel-head p,.admin-tip p{margin:0;color:var(--text-muted);font-size:12px;line-height:1.55}.content-map{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:16px}.content-map-row{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-radius:14px;background:var(--surface-glass)}.content-map-row div{display:flex;align-items:center;gap:8px;color:var(--text-secondary);font-size:12px;font-weight:700}.content-map-row i{color:#7f8cff}.admin-tip{display:flex;gap:14px;align-items:flex-start}.tip-icon{font-size:24px}.subtabs{display:flex;gap:6px;padding:6px;overflow:auto;margin-bottom:16px}.subtabs button{border:0;background:transparent;color:var(--text-secondary);border-radius:12px;padding:9px 12px;font-size:12px;font-weight:800;white-space:nowrap}.subtabs button.active{background:var(--accent-soft);color:var(--accent)}
@media(max-width:760px){.admin-hero{padding:22px;align-items:flex-start}.admin-hero-badge{min-width:100px}.admin-hero h1{font-size:25px}.admin-grid.three{grid-template-columns:1fr}.content-map{grid-template-columns:1fr}.admin-content{padding-top:16px}.admin-panel{padding:16px}}
</style>
