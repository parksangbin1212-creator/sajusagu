
async function calculateAll(year, month, day, hour, minute, gender, latitude, longitude) {
  try {
    const res = await fetch('/api/saju', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ year, month, day, hour, minute, gender, latitude, longitude })
    });
    if (!res.ok) throw new Error('API 호출 실패');
    return await res.json();
  } catch (err) {
    // 로컬 개발 환경에서는 직접 계산
    const { calculateSaju } = await import('@orrery/core/saju');
    const { createChart } = await import('@orrery/core/ziwei');
    const { calculateNatal } = await import('@orrery/core/natal');
    const input = { year, month, day, hour, minute, gender };
    const saju = calculateSaju(input);
    const ziwei = createChart(year, month, day, hour, minute, gender === 'M');
    const natal = await calculateNatal({ ...input, latitude, longitude });
    return { saju, ziwei, natal };
  }
}
// API 키
const API_KEY = import.meta.env.VITE_API_KEY;

// 도시 목록
const CITY_LIST = [
  '서울','서귀포','성남','수원','시흥','속초','삼척','상주','사천','순천','세종',
  '안산','안양','아산','안동','양산','양주','양평','양구','양양','여수','여주',
  '영주','영천','영동','영양','영덕','영월','오산','원주','울산','울진','의정부',
  '의령','이천','인천','인제','부산','부천','부안','부여','봉화','보령','보은',
  '보성','평택','평창','파주','포항','포천','춘천','충주','청주','청송','청양',
  '창원','창녕','철원','천안','대구','대전','당진','담양','단양','동해','동두천',
  '고양','고성','고창','고흥','공주','곡성','괴산','광주','광명','광양','거제',
  '거창','계룡','경주','경산','구미','구리','군산','군포','군위','금산','김해',
  '김천','김포','김제','가평','강릉','강진','남원','남양주','남해','나주','논산',
  '밀양','목포','무주','무안','문경','하동','하남','함안','함평','함양','합천',
  '화성','화순','화천','횡성','홍천','홍성','해남','제주','전주','정읍','정선',
  '진주','진안','진천','진도','장흥','장성','장수','태백','태안','통영','완주',
  '완도','용인','익산','임실','예산','예천','영광','영암','연천','음성'
];

// 지역별 위도·경도
const LOCATIONS = {
  '서울': { lat: 37.5665, lng: 126.9780 },
  '부산': { lat: 35.1796, lng: 129.0756 },
  '대구': { lat: 35.8714, lng: 128.6014 },
  '인천': { lat: 37.4563, lng: 126.7052 },
  '광주': { lat: 35.1595, lng: 126.8526 },
  '대전': { lat: 36.3504, lng: 127.3845 },
  '울산': { lat: 35.5384, lng: 129.3114 },
  '세종': { lat: 36.4800, lng: 127.2890 },
  '창원': { lat: 35.2280, lng: 128.6811 },
  '수원': { lat: 37.2636, lng: 127.0286 },
  '성남': { lat: 37.4196, lng: 127.1267 },
  '고양': { lat: 37.6584, lng: 126.8320 },
  '용인': { lat: 37.2411, lng: 127.1776 },
  '부천': { lat: 37.5034, lng: 126.7660 },
  '안산': { lat: 37.3219, lng: 126.8309 },
  '안양': { lat: 37.3943, lng: 126.9568 },
  '남양주': { lat: 37.6360, lng: 127.2164 },
  '화성': { lat: 37.1996, lng: 126.8312 },
  '평택': { lat: 36.9921, lng: 127.1129 },
  '의정부': { lat: 37.7381, lng: 127.0337 },
  '시흥': { lat: 37.3800, lng: 126.8030 },
  '파주': { lat: 37.7601, lng: 126.7800 },
  '김포': { lat: 37.6154, lng: 126.7158 },
  '광명': { lat: 37.4784, lng: 126.8644 },
  '하남': { lat: 37.5393, lng: 127.2147 },
  '군포': { lat: 37.3614, lng: 126.9352 },
  '오산': { lat: 37.1498, lng: 127.0772 },
  '이천': { lat: 37.2724, lng: 127.4344 },
  '양주': { lat: 37.7854, lng: 127.0456 },
  '구리': { lat: 37.5943, lng: 127.1296 },
  '포천': { lat: 37.8948, lng: 127.2004 },
  '여주': { lat: 37.2980, lng: 127.6378 },
  '동두천': { lat: 37.9035, lng: 127.0607 },
  '가평': { lat: 37.8315, lng: 127.5107 },
  '양평': { lat: 37.4916, lng: 127.4877 },
  '연천': { lat: 38.0961, lng: 127.0748 },
  '춘천': { lat: 37.8813, lng: 127.7300 },
  '원주': { lat: 37.3422, lng: 127.9201 },
  '강릉': { lat: 37.7519, lng: 128.8761 },
  '동해': { lat: 37.5247, lng: 129.1145 },
  '태백': { lat: 37.1641, lng: 128.9858 },
  '속초': { lat: 38.2070, lng: 128.5918 },
  '삼척': { lat: 37.4499, lng: 129.1650 },
  '홍천': { lat: 37.6969, lng: 127.8889 },
  '횡성': { lat: 37.4919, lng: 127.9851 },
  '영월': { lat: 37.1838, lng: 128.4616 },
  '평창': { lat: 37.3705, lng: 128.3905 },
  '정선': { lat: 37.3801, lng: 128.6600 },
  '철원': { lat: 38.1465, lng: 127.3134 },
  '화천': { lat: 38.1062, lng: 127.7083 },
  '양구': { lat: 38.1063, lng: 127.9896 },
  '인제': { lat: 38.0700, lng: 128.1706 },
  '양양': { lat: 38.0754, lng: 128.6190 },
  '청주': { lat: 36.6424, lng: 127.4890 },
  '충주': { lat: 36.9910, lng: 127.9259 },
  '제천': { lat: 37.1326, lng: 128.1908 },
  '보은': { lat: 36.4895, lng: 127.7294 },
  '옥천': { lat: 36.3063, lng: 127.5707 },
  '영동': { lat: 36.1750, lng: 127.7769 },
  '증평': { lat: 36.7853, lng: 127.5815 },
  '진천': { lat: 36.8554, lng: 127.4351 },
  '괴산': { lat: 36.8155, lng: 127.7875 },
  '음성': { lat: 36.9402, lng: 127.6901 },
  '단양': { lat: 36.9846, lng: 128.3655 },
  '천안': { lat: 36.8151, lng: 127.1139 },
  '공주': { lat: 36.4465, lng: 127.1190 },
  '보령': { lat: 36.3331, lng: 126.6127 },
  '아산': { lat: 36.7898, lng: 127.0022 },
  '서산': { lat: 36.7848, lng: 126.4503 },
  '논산': { lat: 36.1874, lng: 127.0990 },
  '계룡': { lat: 36.2742, lng: 127.2488 },
  '당진': { lat: 36.8895, lng: 126.6296 },
  '전주': { lat: 35.8242, lng: 127.1479 },
  '군산': { lat: 35.9677, lng: 126.7368 },
  '익산': { lat: 35.9483, lng: 126.9577 },
  '정읍': { lat: 35.5699, lng: 126.8557 },
  '남원': { lat: 35.4165, lng: 127.3900 },
  '김제': { lat: 35.8033, lng: 126.8808 },
  '목포': { lat: 34.8118, lng: 126.3922 },
  '여수': { lat: 34.7604, lng: 127.6622 },
  '순천': { lat: 34.9506, lng: 127.4872 },
  '나주': { lat: 35.0160, lng: 126.7108 },
  '광양': { lat: 34.9407, lng: 127.6956 },
  '포항': { lat: 36.0190, lng: 129.3435 },
  '경주': { lat: 35.8562, lng: 129.2247 },
  '김천': { lat: 36.1397, lng: 128.1136 },
  '안동': { lat: 36.5684, lng: 128.7294 },
  '구미': { lat: 36.1195, lng: 128.3446 },
  '영주': { lat: 36.8057, lng: 128.6241 },
  '영천': { lat: 35.9733, lng: 128.9383 },
  '상주': { lat: 36.4108, lng: 128.1591 },
  '문경': { lat: 36.5862, lng: 128.1862 },
  '경산': { lat: 35.8251, lng: 128.7414 },
  '진주': { lat: 35.1799, lng: 128.1076 },
  '통영': { lat: 34.8544, lng: 128.4333 },
  '사천': { lat: 35.0036, lng: 128.0645 },
  '김해': { lat: 35.2342, lng: 128.8811 },
  '밀양': { lat: 35.5036, lng: 128.7460 },
  '거제': { lat: 34.8804, lng: 128.6213 },
  '양산': { lat: 35.3350, lng: 129.0364 },
  '제주': { lat: 33.4996, lng: 126.5312 },
  '서귀포': { lat: 33.2541, lng: 126.5600 },
};

function getLocation(place) {
  for (const [key, val] of Object.entries(LOCATIONS)) {
    if (place.includes(key)) return val;
  }
  return { lat: 37.5665, lng: 126.9780 };
}

// 상태
let selectedPlan = '490';
let selectedChip = '💼 직업·커리어';

// DOM 로드 후 드롭다운 생성
document.addEventListener('DOMContentLoaded', () => {
  const currentYear = new Date().getFullYear();

  const yearSel = document.getElementById('birthYear');
  for (let y = currentYear; y >= 1930; y--) {
    const opt = document.createElement('option');
    opt.value = y; opt.textContent = y;
    yearSel.appendChild(opt);
  }

  const monthSel = document.getElementById('birthMonth');
  for (let m = 1; m <= 12; m++) {
    const opt = document.createElement('option');
    opt.value = m; opt.textContent = m;
    monthSel.appendChild(opt);
  }

  const daySel = document.getElementById('birthDay');
  for (let d = 1; d <= 31; d++) {
    const opt = document.createElement('option');
    opt.value = d; opt.textContent = d;
    daySel.appendChild(opt);
  }

  const hourSel = document.getElementById('birthHour');
  for (let h = 0; h <= 23; h++) {
    const opt = document.createElement('option');
    opt.value = h; opt.textContent = h + '시';
    hourSel.appendChild(opt);
  }

  const minuteSel = document.getElementById('birthMinute');
  for (let min = 0; min <= 59; min++) {
    const opt = document.createElement('option');
    opt.value = min; opt.textContent = min + '분';
    minuteSel.appendChild(opt);
  }
});

// 자동완성
window.searchCity = function(val) {
  const dropdown = document.getElementById('cityDropdown');
  if (!val || val.length < 1) { dropdown.style.display = 'none'; return; }
  const filtered = CITY_LIST.filter(c => c.includes(val));
  if (filtered.length === 0) { dropdown.style.display = 'none'; return; }
  dropdown.innerHTML = filtered.map(c =>
    `<div class="city-item" onclick="selectCity('${c}')">${c}</div>`
  ).join('');
  dropdown.style.display = 'block';
};

window.selectCity = function(city) {
  document.getElementById('birthplace').value = city;
  document.getElementById('cityDropdown').style.display = 'none';
};

document.addEventListener('click', (e) => {
  if (!e.target.closest('.autocomplete-wrap')) {
    const dd = document.getElementById('cityDropdown');
    if (dd) dd.style.display = 'none';
  }
});

// 플랜 선택
window.selectPlan = function(plan) {
  selectedPlan = plan;
  document.getElementById('plan490').className = 'plan-card' + (plan === '490' ? ' sel-490' : '');
  document.getElementById('plan4900').className = 'plan-card' + (plan === '4900' ? ' sel-4900' : '');
  document.getElementById('worryField').style.display = plan === '4900' ? 'block' : 'none';
};

window.selectChip = function(el) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  selectedChip = el.textContent.trim();
};

// 화면 전환
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

window.goHome = function() { showScreen('screenForm'); };

window.upgrade = function() {
  window.selectPlan('4900');
  showScreen('screenForm');
  setTimeout(() => {
    document.getElementById('worryField').scrollIntoView({ behavior: 'smooth' });
  }, 300);
};

function showError(msg) {
  const box = document.getElementById('errorBox');
  box.textContent = msg;
  box.style.display = 'block';
}
function hideError() {
  document.getElementById('errorBox').style.display = 'none';
}

// 시간 모름 토글
window.toggleTime = function(checkbox) {
  const hourSel = document.getElementById('birthHour');
  const minuteSel = document.getElementById('birthMinute');
  const row = hourSel.closest('.datetime-row');
  if (checkbox.checked) {
    hourSel.value = ''; minuteSel.value = '';
    hourSel.disabled = true; minuteSel.disabled = true;
    row.style.opacity = '0.3'; row.style.pointerEvents = 'none';
  } else {
    hourSel.disabled = false; minuteSel.disabled = false;
    row.style.opacity = '1'; row.style.pointerEvents = 'auto';
  }
};

// 프롬프트
const PROMPT_490 = `당신은 사주사구의 명리 분석 시스템입니다.
아래 규칙을 반드시 지켜서 리포트를 작성하세요.

1. 한자를 단독으로 쓰지 마세요. 반드시 "한글(한자)" 형식으로 써주세요.
   단, 입력된 사주 데이터의 간지(干支)는 절대 임의로 바꾸지 마세요.
   예) 일주가 戊申이면 반드시 무신(戊申)으로, 절대 무술(戊戌)로 바꾸지 마세요.
2. 각 항목은 반드시 10줄 이상 작성하세요.
3. 어려운 명리 용어는 반드시 쉽게 풀어쓰세요.
4. 좋은 말만 하지 마세요. 약점도 솔직하게, 하지만 따뜻하게.
5. 말투는 "~해요", "~예요" 체로 통일.
6. 세 가지 체계를 따로 나열하지 말고 하나의 결론으로 통합해서 써주세요.
7. 리포트 제목은 "사주사구 분석 리포트"로 하세요. AI 언급 금지.

출력 형식:
[01] 나는 어떤 사람인지
[02] 어떤 일주이고 어떤 성향인지
[03] 성격의 장단점 (강점 3가지, 약점 3가지)
[04] 평생총운
[05] 나의 대운 흐름
[06] 어떤 사람을 만나야 하는지
[07] 인간관계
[08] 재물복
[09] 어떤 성향의 직업이 맞는지 (잘 맞는 직업군 5가지 이상)

마지막에:
---
💌 사주사구 분석 완료
3가지 체계를 종합 연산한 결과예요.
더 깊은 분석은 심층 분석(4,900원)에서 확인하세요.
---`;

const PROMPT_4900 = `당신은 사주사구의 명리 분석 시스템입니다.
아래 규칙을 반드시 지켜서 리포트를 작성하세요.

1. 한자를 단독으로 쓰지 마세요. 반드시 "한글(한자)" 형식으로 써주세요.
   단, 입력된 사주 데이터의 간지(干支)는 절대 임의로 바꾸지 마세요.
   예) 일주가 戊申이면 반드시 무신(戊申)으로, 절대 무술(戊戌)로 바꾸지 마세요.
2. 모든 항목은 반드시 25줄 이상 작성하세요.
3. 어려운 명리 용어는 반드시 쉽게 풀어쓰세요.
4. 좋은 말만 하지 마세요. 솔직하되 따뜻하게.
5. 말투는 "~해요", "~예요" 체로 통일.
6. 세 가지 체계를 따로 나열하지 말고 하나의 결론으로 통합해서 써주세요.
7. 리포트 제목은 "사주사구 심층 분석 리포트"로 하세요. AI 언급 금지.

출력 형식:
[01] 나는 어떤 사람인지
[02] 어떤 일주이고 어떤 성향인지
[03] 성격의 장단점
[04] 평생총운
[05] 나의 대운 흐름
[06] 어떤 사람을 만나야 하는지
[07] 인간관계
[08] 재물복
[09] 어떤 성향의 직업이 맞는지
[10] 지금 이 시기 나는 어떤 운 안에 있나
[11] 올해 운세 (오늘 날짜 기준 현재 연도)
[12] 내년 운세 (오늘 날짜 기준 다음 연도)
[13] 고민에 대한 직접 답변 (구체적 시기와 근거 포함)
[14] 조심해야 할 것들
[15] 지금 당장 해야 할 것 vs 하지 말아야 할 것
[16] 나에게 좋은 방향·색·숫자

마지막에:
---
💌 사주사구 심층 분석 완료
3가지 체계를 종합 연산한 결과예요.
---`;

// 메인 제출 함수
window.handleSubmit = async function() {
  hideError();

  const birthYear = document.getElementById('birthYear').value;
  const birthMonth = document.getElementById('birthMonth').value;
  const birthDay = document.getElementById('birthDay').value;
  const birthHour = document.getElementById('birthHour').value;
  const birthMinute = document.getElementById('birthMinute').value;
  const gender = document.getElementById('gender').value;
  const birthplace = document.getElementById('birthplace').value.trim();
  const worry = document.getElementById('worry').value.trim();

  if (!birthYear || !birthMonth || !birthDay) return showError('생년월일을 모두 입력해주세요.');
  if (!gender) return showError('성별을 선택해주세요.');
  if (!birthplace || birthplace.length < 2) return showError('태어난 지역을 입력해주세요.');
  const userEmail = document.getElementById('userEmail').value.trim();
  if (!userEmail) return showError('이메일을 입력해주세요.');
  
  const year = Number(birthYear);
  const month = Number(birthMonth);
  const day = Number(birthDay);
  const hour = birthHour ? Number(birthHour) : 12;
  const minute = birthMinute ? Number(birthMinute) : 0;
  const isMale = gender === 'M';
  const loc = getLocation(birthplace);

  showScreen('screenLoading');

  try {
    const { saju, ziwei, natal } = await calculateAll(
      year, month, day, hour, minute, gender, loc.lat, loc.lng
    );

    const pillars = saju.pillars;

    setTimeout(() => {
      document.getElementById('loadingStep2').className = 'loading-step done';
      document.getElementById('loadingStep2').textContent = '✓ 종합 분석 완료';
      document.getElementById('loadingStep3').className = 'loading-step active';
      document.getElementById('loadingStep3').textContent = '⟳ 리포트 작성 중...';
    }, 500);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentAge = currentYear - year;

    const currentDaewoon = saju.daewoon.find((d, i) => {
      const next = saju.daewoon[i + 1];
      return d.age <= currentAge && (!next || next.age > currentAge);
    });

    const dataText = `
四柱八字 (${isMale ? '男' : '女'})
─────
       時柱    日柱    月柱    年柱
─────
십신   ${pillars[0].stemSipsin}    ${pillars[1].stemSipsin}    ${pillars[2].stemSipsin}    ${pillars[3].stemSipsin}
천간     ${pillars[0].pillar.stem}      ${pillars[1].pillar.stem}      ${pillars[2].pillar.stem}      ${pillars[3].pillar.stem}
지지     ${pillars[0].pillar.branch}      ${pillars[1].pillar.branch}      ${pillars[2].pillar.branch}      ${pillars[3].pillar.branch}
십신   ${pillars[0].branchSipsin}    ${pillars[1].branchSipsin}    ${pillars[2].branchSipsin}    ${pillars[3].branchSipsin}
─────
운성   ${pillars[0].unseong}     ${pillars[1].unseong}      ${pillars[2].unseong}      ${pillars[3].unseong}
장간  ${saju.jwabeop[0].map(j=>j.stem).join('')}  ${saju.jwabeop[1].map(j=>j.stem).join('')}  ${saju.jwabeop[2].map(j=>j.stem).join('')}  ${saju.jwabeop[3].map(j=>j.stem).join('')}

사주 4기둥 (반드시 이 한자 그대로 사용하세요. 절대 임의로 바꾸지 마세요):
시주: ${pillars[0].pillar.ganzi}
일주: ${pillars[1].pillar.ganzi}
월주: ${pillars[2].pillar.ganzi}
년주: ${pillars[3].pillar.ganzi}

坐法 (장간 → 운성)
─────
時柱: ${saju.jwabeop[0].map(j=>`${j.stem}(${j.sipsin}·${j.unseong}坐)`).join(' ')}
日柱: ${saju.jwabeop[1].map(j=>`${j.stem}(${j.sipsin}·${j.unseong}坐)`).join(' ')}
月柱: ${saju.jwabeop[2].map(j=>`${j.stem}(${j.sipsin}·${j.unseong}坐)`).join(' ')}
年柱: ${saju.jwabeop[3].map(j=>`${j.stem}(${j.sipsin}·${j.unseong}坐)`).join(' ')}

引從法
─────
${saju.injongbeop.map(i=>`${i.yangStem} ${i.category} → ${i.unseong}從`).join(' · ')}

神殺
─────
문창귀인: ${saju.specialSals.munchang.map(i=>['시주','일주','월주','년주'][i]).join(', ') || '없음'}
도화살: ${saju.specialSals.dohwa.map(i=>['시주','일주','월주','년주'][i]).join(', ') || '없음'}
공망: ${saju.gongmang.branches.join(', ')}

大運
─────
오늘 날짜: ${currentYear}년 ${currentMonth}월
현재 나이: ${currentAge}세
현재 대운: ${currentDaewoon ? `${currentDaewoon.ganzi} ${currentDaewoon.stemSipsin} (${currentDaewoon.age}세 시작, ${new Date(currentDaewoon.startDate).getFullYear()}년~)` : '없음'}

전체 대운:
${saju.daewoon.map((d, i) => 
  `${i+1}運 (${d.age}세)  ${d.stemSipsin}  ${d.ganzi}  ${d.branchSipsin}  (${new Date(d.startDate).getFullYear()}年)`
).join('\n')}

紫微斗數 命盤 (${isMale ? '男' : '女'})
═════
오행국: ${ziwei.wuXingJu.name}
명궁: ${ziwei.mingGongZhi}
신궁: ${ziwei.shenGongZhi || ''}
대한시작나이: ${ziwei.daXianStartAge}세

十二宮
─────
${Object.values(ziwei.palaces).map(p => 
  `${p.name}   ${p.ganZhi}  ${p.stars?.map(s => 
    `${s.name}${s.brightness ? ' ' + s.brightness : ''}${s.siHua ? ' ' + s.siHua : ''}`
  ).join(', ') || '(空宮)'}${p.isShenGong ? ' ★身宮' : ''}`
).join('\n')}

Natal Chart
═════
ASC: ${natal.angles.asc.sign} ${natal.angles.asc.degreeInSign.toFixed(1)}°
MC: ${natal.angles.mc.sign} ${natal.angles.mc.degreeInSign.toFixed(1)}°

Planets
─────
${natal.planets.map(p =>
  `${p.id}: ${p.sign} ${p.degreeInSign.toFixed(1)}°${p.retrograde ? ' R' : ''}`
).join('\n')}

Major Aspects
─────
${natal.aspects?.slice(0, 12).map(a =>
  `${a.planet1} ${a.type} ${a.planet2} orb ${a.orb?.toFixed(1)}°`
).join('\n') || '없음'}
`.trim();

    const userMessage = selectedPlan === '490'
      ? `아래 데이터로 기본 분석 리포트를 작성해주세요.\n\n${dataText}`
      : `아래 데이터로 심층 분석 리포트를 작성해주세요.

집중 분석 영역: ${selectedChip}
고민/질문: ${worry || '없음'}

${dataText}`;

    // 결과 화면 구성
    document.getElementById('resultBadge').textContent =
      selectedPlan === '490' ? '🔴 490원 기본 분석' : '🟡 4,900원 심층 분석';
    document.getElementById('resultTitle').textContent =
      `${year}년생 ${isMale ? '남성' : '여성'}님의 분석 리포트`;
    document.getElementById('resultMeta').innerHTML = `
      <span class="meta-chip">🗓 ${year}년 ${month}월 ${day}일</span>
      ${birthHour ? `<span class="meta-chip">⏰ ${hour}시 ${minute}분</span>` : ''}
      <span class="meta-chip">📍 ${birthplace}</span>
      <span class="meta-chip">${isMale ? '♂ 남성' : '♀ 여성'}</span>
    `;

    const pillarLabels = ['시주', '일주 (나)', '월주', '년주'];
    document.getElementById('sajuPillars').innerHTML = pillars.map((p, i) => `
      <div class="pillar-box ${i === 1 ? 'day' : ''}">
        <div class="pillar-label">${pillarLabels[i]}</div>
        <span class="pillar-gan">${p.pillar.ganzi ? p.pillar.ganzi[0] : ''}</span>
        <span class="pillar-ji">${p.pillar.ganzi ? p.pillar.ganzi[1] : ''}</span>
      </div>
    `).join('');

    document.getElementById('upsellCard').style.display =
      selectedPlan === '490' ? 'block' : 'none';

    const reportEl = document.getElementById('reportContent');
    reportEl.textContent = '분석 중...';

    showScreen('screenResult');

    // 스트리밍
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: selectedPlan === '490' ? 8096 : 16000,
        temperature: 0.3,
        stream: true,
        system: selectedPlan === '490' ? PROMPT_490 : PROMPT_4900,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    reportEl.textContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') break;
          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'content_block_delta' && parsed.delta.type === 'text_delta') {
              reportEl.textContent += parsed.delta.text;
            }
          } catch (e) {}
        }
      }
    }
    // 이메일 발송
    const userEmail = document.getElementById('userEmail').value.trim();
    if (userEmail) {
      const birthInfo = `${year}년 ${month}월 ${day}일생 ${isMale ? '남성' : '여성'} (${birthplace})`;
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: userEmail,
            report: reportEl.textContent,
            birthInfo: birthInfo
          })
        });
      } catch (e) {
        console.log('이메일 발송 실패:', e);
      }
    }


  } catch (err) {
    showScreen('screenForm');
    showError('오류가 발생했어요: ' + (err.message || '다시 시도해주세요.'));
    console.error(err);
  }
};