const VERSION = "16.12.1";
const CDN = `https://ddragon.leagueoflegends.com/cdn/${VERSION}`;
const SPLASH_CDN = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash";

const roleMap = {
  Assassin: "刺客", Fighter: "战士", Mage: "法师",
  Marksman: "射手", Support: "辅助", Tank: "坦克"
};

const profiles = {
  Marksman: {
    score: "S", tags: ["持续输出", "攻速收益", "后排核心"],
    tip: "优先拿能稳定转化为持续伤害的强化。保证射程和生存后再堆输出，活着才有第二轮收割。",
    augments: [
      ["双刀流", "棱彩", "prismatic", "普攻触发额外攻击，极大放大攻速与攻击特效收益。"],
      ["灵魂虹吸", "黄金", "gold", "持续输出同时补充回复，拉长团战容错。"],
      ["攻击加速", "白银", "silver", "技能命中后获得攻速，更快进入输出节奏。"]
    ],
    items: ["6672", "3006", "3031", "3094", "3036", "3072"]
  },
  Mage: {
    score: "A+", tags: ["技能爆发", "法强收益", "远程消耗"],
    tip: "围绕核心技能的冷却与命中构筑。先拿技能升级或急速，再根据敌方前排数量选择穿透或持续灼烧。",
    augments: [
      ["珠光护手", "棱彩", "prismatic", "技能可以暴击，爆发法师的上限强化。"],
      ["面包和黄油", "黄金", "gold", "大幅缩短 Q 技能冷却，适合依赖主技能消耗的英雄。"],
      ["巫师思维", "白银", "silver", "直接获得法术强度，稳定且没有触发门槛。"]
    ],
    items: ["6655", "3020", "3089", "4645", "3135", "3157"]
  },
  Assassin: {
    score: "A", tags: ["高爆发", "切入", "技能急速"],
    tip: "海克斯大乱斗里进场比伤害更稀缺。优先补位移、隐身或保命能力，确保一套爆发后还能脱离。",
    augments: [
      ["暗影疾奔", "棱彩", "prismatic", "参与击杀后获得爆发移速，连续追击或撤离。"],
      ["连招大师", "黄金", "gold", "技能之间衔接普攻可获得额外爆发收益。"],
      ["刽子手", "白银", "silver", "提高对低生命目标的伤害，强化收割能力。"]
    ],
    items: ["6692", "3158", "3142", "3814", "6694", "6333"]
  },
  Fighter: {
    score: "S-", tags: ["近战持续", "回复", "攻防一体"],
    tip: "不要只追求面板伤害。近战英雄最强的组合通常是一个启动强化、一个回复强化，再配一个成长型输出。",
    augments: [
      ["无休回复", "棱彩", "prismatic", "战斗中持续恢复生命，近战缠斗的优先选择。"],
      ["火上浇油", "黄金", "gold", "攻击叠加灼烧，适合长时间贴身作战。"],
      ["坚韧不倒", "白银", "silver", "低生命值时获得额外战斗力，提高反杀空间。"]
    ],
    items: ["6631", "3047", "3071", "3053", "3065", "6333"]
  },
  Tank: {
    score: "A+", tags: ["前排", "控制", "团队承伤"],
    tip: "先解决进场和控制链，再堆抗性。任务型生命成长强化越早拿价值越高，注意根据敌方伤害类型换装。",
    augments: [
      ["钢铁你的心", "棱彩", "prismatic", "任务型生命成长，完成阶段目标后获得更高坦度上限。"],
      ["巨像的勇气", "黄金", "gold", "控制敌人后获得护盾，稳定覆盖每次开团。"],
      ["急救箱", "白银", "silver", "提高治疗与护盾效果，增强团队续航。"]
    ],
    items: ["3075", "3047", "3084", "3065", "2504", "3143"]
  },
  Support: {
    score: "A", tags: ["团队增益", "保护", "技能急速"],
    tip: "优先选择能影响全队的治疗、护盾和技能急速强化。活下来多放一轮技能，通常比补个人伤害更有价值。",
    augments: [
      ["风语者的祝福", "棱彩", "prismatic", "强化治疗和护盾，并为队友提供额外保护。"],
      ["圣光守护", "黄金", "gold", "施加保护效果时为队友补充持续回复。"],
      ["急救箱", "白银", "silver", "无条件提高治疗与护盾强度，泛用稳定。"]
    ],
    items: ["6617", "3158", "6616", "3107", "3222", "3089"]
  }
};

const primaryBuildNames = {
  Marksman: "暴击收割", Mage: "远程爆发", Assassin: "切入秒杀",
  Fighter: "持续战士", Tank: "不灭前排", Support: "团队保护"
};

const alternateProfiles = {
  Marksman: {
    name: "特效生存",
    tip: "舍弃部分暴击上限，依靠攻击特效、吸血和抗性提高持续作战能力。对面前排多或突进压力大时更稳定。",
    augments: [
      ["瞄准镜武器", "棱彩", "prismatic", "增加攻击距离，优先改善安全输出空间。"],
      ["灵魂虹吸", "黄金", "gold", "攻击与技能伤害提供回复，增强残局续航。"],
      ["轻盈步法", "白银", "silver", "攻击后获得移速，便于走砍和躲避关键技能。"]
    ],
    items: ["6672", "3006", "3124", "3091", "3153", "3085"]
  },
  Mage: {
    name: "急速灼烧",
    tip: "降低单次爆发，换取更短冷却与持续灼烧。敌方前排较多、团战时间较长时优先使用。",
    augments: [
      ["终极刷新", "棱彩", "prismatic", "显著提高大招使用频率，持续给对方施加压力。"],
      ["面包和奶酪", "黄金", "gold", "缩短 E 技能冷却，增加消耗和控场频率。"],
      ["技能急速", "白银", "silver", "稳定提高技能循环，没有额外触发条件。"]
    ],
    items: ["6653", "3020", "3118", "3165", "3135", "3157"]
  },
  Assassin: {
    name: "持续战斗",
    tip: "用生命、回复与技能急速替代部分极限爆发。适合难以一套秒杀或需要频繁进出战场的对局。",
    augments: [
      ["无休回复", "棱彩", "prismatic", "战斗中不断回复，为第二次进场创造空间。"],
      ["火上浇油", "黄金", "gold", "延长作战时持续叠加额外伤害。"],
      ["坚韧不倒", "白银", "silver", "低生命值阶段提高反打和撤离能力。"]
    ],
    items: ["6692", "3158", "3071", "3053", "6333", "3065"]
  },
  Fighter: {
    name: "爆发突进",
    tip: "牺牲部分正面坦度，换取更强的接近目标和第一轮爆发。适合敌方后排多、缺少稳定保护的阵容。",
    augments: [
      ["暗影疾奔", "棱彩", "prismatic", "参与击杀后获得爆发移速，连续追击后排。"],
      ["连招大师", "黄金", "gold", "技能与普攻交替时获得额外爆发。"],
      ["刽子手", "白银", "silver", "提高对低生命目标的伤害，强化收割。"]
    ],
    items: ["6692", "3047", "3071", "3742", "3053", "6333"]
  },
  Tank: {
    name: "控制辅助",
    tip: "降低个人承伤上限，换取更高技能频率和团队增益。己方已有另一名前排时，这套路线价值更高。",
    augments: [
      ["风语者的祝福", "棱彩", "prismatic", "强化给予队友的护盾与保护效果。"],
      ["巨像的勇气", "黄金", "gold", "控制命中后获得护盾，支持反复开团。"],
      ["技能急速", "白银", "silver", "提高控制技能频率，稳定服务团队。"]
    ],
    items: ["3190", "3047", "3109", "3065", "3222", "3143"]
  },
  Support: {
    name: "法强消耗",
    tip: "在保留基础功能性的同时补足法强和穿透。己方伤害不足、对手难以直接切入你时可以选择。",
    augments: [
      ["珠光护手", "棱彩", "prismatic", "让伤害技能拥有暴击可能，提高消耗上限。"],
      ["面包和黄油", "黄金", "gold", "缩短主要技能冷却，兼顾控制与输出。"],
      ["巫师思维", "白银", "silver", "直接获得法术强度，稳定强化技能效果。"]
    ],
    items: ["6655", "3158", "4645", "3089", "3135", "3157"]
  }
};

const championOverrides = {
  Yasuo: {
    name: "暴击收割", score: "S+", tags: ["暴击联动", "高机动", "近战收割"],
    tip: "暴击溢出会转化为攻击力，优先选择普攻联动、攻速与生存类强化。面对高爆发阵容时，保命海克斯高于第三个输出海克斯。",
    augments: [
      ["幻影武器", "棱彩", "prismatic", "技能可触发攻击特效，Q 与普攻体系获得爆发式提升。"],
      ["双刀流", "黄金", "gold", "额外普攻与高攻速、暴击构筑高度契合。"],
      ["轻盈步法", "白银", "silver", "攻击后获得移速，更容易连续穿梭与追击。"]
    ],
    items: ["3006", "6673", "3031", "3072", "6333", "3036"]
  },
  Lux: {
    name: "远程爆发", tags: ["远程消耗", "控制", "护盾支援"],
    tip: "Q 或 E 的技能升级强化优先级最高。对手前排多时放弃纯爆发，转向急速、灼烧和法穿。",
    items: ["6655", "3020", "4645", "3089", "3135", "3157"]
  },
  Garen: {
    name: "重装旋转", score: "S", tags: ["持续旋转", "斩杀", "高韧性"],
    tip: "寻找能强化 E 持续伤害或缩短核心技能冷却的海克斯。移速和韧性决定你是否真的能把伤害打满。",
    items: ["6631", "3047", "3071", "3742", "3053", "3143"]
  },
  Jinx: {
    name: "暴击收割", score: "S+", tags: ["超远射程", "击杀启动", "范围收割"],
    tip: "围绕被动启动后的攻速与移速滚雪球。先确保有一次参与击杀的机会，射程强化通常拥有最高实战价值。",
    augments: [
      ["瞄准镜武器", "棱彩", "prismatic", "增加攻击距离，让火箭形态更安全地覆盖战场。"],
      ["双刀流", "黄金", "gold", "额外攻击配合高攻速快速清场。"],
      ["刽子手", "白银", "silver", "更容易完成第一次击杀并触发被动。"]
    ]
  },
  Vayne: {
    name: "攻速三环", score: "S+", tags: ["真实伤害", "单体追猎", "高机动"],
    tip: "攻速与生存就是伤害。海克斯优先补射程、攻击特效和隐身容错，不必过度堆纯攻击力。",
    augments: [
      ["双刀流", "棱彩", "prismatic", "快速叠加圣银弩箭，直接放大核心机制。"],
      ["瞄准镜武器", "黄金", "gold", "补足短射程缺陷，显著改善输出环境。"],
      ["轻盈步法", "白银", "silver", "走砍获得额外机动性，持续拉开身位。"]
    ],
    items: ["6672", "3006", "3124", "3091", "3153", "3085"]
  }
};

const secondaryOverrides = {
  Yasuo: {
    name: "坦韧吸血",
    tip: "面对多控制或高爆发阵容时，用吸血、韧性和减伤确保能完成第二轮技能循环，输出上限略低但稳定性更高。",
    augments: [
      ["无休回复", "棱彩", "prismatic", "持续近战时不断回复，提升团战容错。"],
      ["巨像的勇气", "黄金", "gold", "击飞目标后获得护盾，强化进场保护。"],
      ["坚韧不倒", "白银", "silver", "残血阶段提升输出，配合吸血完成反打。"]
    ],
    items: ["3006", "6673", "3072", "6333", "3053", "3065"]
  },
  Jinx: {
    name: "特效风筝",
    tip: "面对坦克与强突进时选择攻击特效路线，利用额外射程、移速和吸血维持稳定输出。",
    items: ["6672", "3006", "3124", "3091", "3153", "3085"]
  },
  Garen: {
    name: "爆发斩杀",
    tip: "敌方脆皮较多时提高穿甲与接近目标的能力，依靠一轮 E 加大招快速形成减员。",
    augments: [
      ["暗影疾奔", "棱彩", "prismatic", "参与击杀后继续加速，完成连续收割。"],
      ["连招大师", "黄金", "gold", "强化 Q、E 与普攻衔接的第一轮伤害。"],
      ["刽子手", "白银", "silver", "与大招斩杀机制形成明确协同。"]
    ],
    items: ["6692", "3047", "3142", "3742", "3071", "6333"]
  },
  Lux: {
    name: "护盾急速",
    tip: "队伍输出充足时转向技能急速与团队保护，通过频繁控制和双段护盾提高全队容错。",
    augments: [
      ["风语者的祝福", "棱彩", "prismatic", "显著提高 W 对多名队友的保护能力。"],
      ["圣光守护", "黄金", "gold", "护盾附带持续回复，适合拉扯阵容。"],
      ["急救箱", "白银", "silver", "稳定放大每次护盾的有效价值。"]
    ],
    items: ["6617", "3158", "6616", "3107", "3222", "3089"]
  },
  Vayne: {
    name: "半肉追猎",
    tip: "真实伤害已经提供足够的后期输出，可以用抗性与回复换取更多三环触发次数，尤其适合近战混战。",
    items: ["6672", "3006", "3124", "3053", "3065", "3091"]
  }
};

let champions = [];
let items = {};
let current = null;
let currentBuilds = [];
let currentBuildIndex = 0;
let activeResult = 0;

const els = {
  search: document.querySelector("#heroSearch"),
  results: document.querySelector("#searchResults"),
  art: document.querySelector("#championArt"),
  name: document.querySelector("#championName"),
  title: document.querySelector("#championTitle"),
  role: document.querySelector("#roleBadge"),
  score: document.querySelector("#powerScore"),
  tags: document.querySelector("#playstyleTags"),
  tip: document.querySelector("#coreTip"),
  tabs: document.querySelector("#buildTabs"),
  augments: document.querySelector("#augmentGrid"),
  build: document.querySelector("#buildPath")
};

function normalize(value) {
  return value.toLowerCase().replace(/[\s'·.-]/g, "");
}

function getBuilds(champion) {
  const primary = champion.tags[0] || "Fighter";
  const main = {
    name: primaryBuildNames[primary],
    ...profiles[primary],
    ...(championOverrides[champion.id] || {})
  };
  const alternate = {
    score: main.score,
    tags: main.tags,
    ...alternateProfiles[primary],
    ...(secondaryOverrides[champion.id] || {})
  };
  return [main, alternate];
}

function renderBuild(index) {
  currentBuildIndex = index;
  const profile = currentBuilds[index];
  els.tabs.querySelectorAll(".build-tab").forEach((tab, tabIndex) => {
    tab.classList.toggle("active", tabIndex === index);
    tab.setAttribute("aria-selected", tabIndex === index ? "true" : "false");
  });
  els.tip.textContent = profile.tip;
  els.augments.innerHTML = profile.augments.map(([name, tier, rank, reason], augmentIndex) => `
    <article class="augment-card" style="--rank:${rank === "prismatic" ? "#c66fff" : rank === "gold" ? "#d5a94e" : "#79a7ae"}">
      <div class="augment-top">
        <div class="augment-icon"><span>${augmentIndex + 1}</span></div>
        <span class="tier">${tier} · ${augmentIndex === 0 ? "首选" : augmentIndex === 1 ? "次选" : "备选"}</span>
      </div>
      <h3>${name}</h3>
      <p>${reason}</p>
    </article>
  `).join("");
  els.build.innerHTML = profile.items.map((id, itemIndex) => {
    const item = items[id] || { name: `装备 ${id}`, image: { full: `${id}.png` } };
    const arrow = itemIndex ? `<span class="path-arrow">›</span>` : "";
    return `${arrow}<div class="item-card" title="${item.name}">
      <img src="${CDN}/img/item/${item.image.full}" alt="${item.name}">
      <strong>${item.name}</strong>
    </div>`;
  }).join("");
}

function renderChampion(champion) {
  current = champion;
  currentBuilds = getBuilds(champion);
  const profile = currentBuilds[0];
  document.querySelector(".champion-art-wrap").classList.add("loading");
  els.art.src = `${SPLASH_CDN}/${champion.id}_0.jpg`;
  els.art.alt = champion.name;
  els.art.onload = () => document.querySelector(".champion-art-wrap").classList.remove("loading");
  els.name.textContent = champion.name;
  els.title.textContent = champion.title;
  els.role.textContent = champion.tags.map(tag => roleMap[tag] || tag).join(" · ");
  els.score.textContent = profile.score;
  els.tags.innerHTML = profile.tags.map(tag => `<span>${tag}</span>`).join("");
  els.tabs.innerHTML = currentBuilds.map((build, index) => `
    <button class="build-tab ${index === 0 ? "active" : ""}" role="tab"
      aria-selected="${index === 0 ? "true" : "false"}" data-build-index="${index}">
      <span>方案 ${index + 1}</span><strong>${build.name}</strong>
    </button>
  `).join("");
  renderBuild(0);
  els.search.value = champion.name;
  closeResults();
  document.title = `${champion.name}海克斯推荐 - 海克斯先知`;
}

function filterChampions(query) {
  const q = normalize(query);
  if (!q) return [];
  return champions.filter(champion =>
    normalize(champion.name).includes(q) ||
    normalize(champion.id).includes(q) ||
    normalize(champion.title).includes(q)
  ).slice(0, 8);
}

function showResults(matches) {
  activeResult = 0;
  if (!matches.length) {
    els.results.innerHTML = `<div class="result-row"><span><strong>没有找到这个英雄</strong><small>试试中文全名或英文名</small></span></div>`;
  } else {
    els.results.innerHTML = matches.map((champion, index) => `
      <button class="result-row ${index === 0 ? "active" : ""}" data-id="${champion.id}">
        <img src="${CDN}/img/champion/${champion.image.full}" alt="">
        <span><strong>${champion.name}</strong><small>${champion.id} · ${champion.title}</small></span>
      </button>
    `).join("");
  }
  els.results.classList.add("open");
}

function closeResults() {
  els.results.classList.remove("open");
}

function selectById(id) {
  const champion = champions.find(item => item.id === id);
  if (champion) renderChampion(champion);
}

async function init() {
  try {
    const [championRes, itemRes] = await Promise.all([
      fetch(`${CDN}/data/zh_CN/champion.json`),
      fetch(`${CDN}/data/zh_CN/item.json`)
    ]);
    if (!championRes.ok || !itemRes.ok) throw new Error("Data Dragon 请求失败");
    const championData = await championRes.json();
    const itemData = await itemRes.json();
    champions = Object.values(championData.data).sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
    items = itemData.data;
    selectById("Yasuo");
  } catch (error) {
    els.search.placeholder = "英雄数据加载失败，请检查网络后刷新";
    els.tip.textContent = "无法连接 Riot Data Dragon，页面框架仍可浏览。";
    console.error(error);
  }
}

els.search.addEventListener("input", event => {
  const matches = filterChampions(event.target.value);
  if (event.target.value.trim()) showResults(matches);
  else closeResults();
});

els.search.addEventListener("keydown", event => {
  const rows = [...els.results.querySelectorAll("[data-id]")];
  if (!rows.length) return;
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    activeResult = (activeResult + (event.key === "ArrowDown" ? 1 : -1) + rows.length) % rows.length;
    rows.forEach((row, index) => row.classList.toggle("active", index === activeResult));
    rows[activeResult].scrollIntoView({ block: "nearest" });
  }
  if (event.key === "Enter") {
    event.preventDefault();
    selectById(rows[activeResult].dataset.id);
  }
  if (event.key === "Escape") closeResults();
});

els.results.addEventListener("click", event => {
  const row = event.target.closest("[data-id]");
  if (row) selectById(row.dataset.id);
});

document.querySelector(".quick-picks").addEventListener("click", event => {
  const button = event.target.closest("[data-champion]");
  if (button) selectById(button.dataset.champion);
});

els.tabs.addEventListener("click", event => {
  const tab = event.target.closest("[data-build-index]");
  if (tab) renderBuild(Number(tab.dataset.buildIndex));
});

document.addEventListener("click", event => {
  if (!event.target.closest("#searchShell")) closeResults();
});

const dialog = document.querySelector("#aboutDialog");
document.querySelector("#aboutBtn").addEventListener("click", () => dialog.showModal());
document.querySelector("#closeDialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

init();
