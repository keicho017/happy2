let selectedPart = "eye";
// ❗ 본인의 실제 이미지 파일 개수로 수정 (사진보다 숫자가 크면 깨짐!)
const counts = { face: 5, eye: 5, nose: 3, mouth: 4, accessory: 5, ear: 3 };

function selectPart(part) { selectedPart = part; }

function moveSelected(value) {
    const target = document.getElementById(selectedPart);
    if(target) target.style.top = value + "%";
}

function resizeSelected(value) {
    const target = document.getElementById(selectedPart);
    if(target) target.style.width = value + "%";
}

function adjustEarX(value) {
    document.getElementById("ear-left").style.left = value + "%";
    document.getElementById("ear-right").style.right = value + "%";
}

function adjustEarY(value) {
    document.getElementById("ear-left").style.top = value + "%";
    document.getElementById("ear-right").style.top = value + "%";
}

function resizeEars(value) {
    document.getElementById("ear-left").style.width = value + "%";
    document.getElementById("ear-right").style.width = value + "%";
}

function randomize() {
    ['face', 'eye', 'nose', 'mouth'].forEach(p => {
        const num = Math.floor(Math.random() * counts[p]) + 1;
        document.getElementById(p).src = `assets/${p}/${p}_${num}.png`;
    });

    // 액세서리 파일명 acc_1.png 규칙
    const accNum = Math.floor(Math.random() * counts.accessory) + 1;
    document.getElementById("accessory").src = `assets/accessory/acc_${accNum}.png`;

    // 귀 파일명 ear_1.png 규칙
    const earNum = Math.floor(Math.random() * counts.ear) + 1;
    const earPath = `assets/ear/ear_${earNum}.png`;
    document.getElementById("ear-left").src = earPath;
    document.getElementById("ear-right").src = earPath;
}

// 💾 저장 기능 (보안 이슈 최소화 버전)
function savePNG() {
    const charArea = document.getElementById("character");
    
    // html2canvas 옵션에서 보안 관련 설정을 미세하게 조정
    html2canvas(charArea, {
        backgroundColor: null,
        useCORS: false,      // 로컬 테스트 시 false가 더 안정적일 수 있음
        allowTaint: true,    // 로컬 이미지를 캔버스에 그릴 수 있도록 허용
        scale: 2
    }).then(canvas => {
        const imageData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imageData;
        link.download = "jeja_character.png";
        link.click();
    }).catch(err => {
        console.error("저장 오류:", err);
        alert("저장에 실패했습니다. 로컬 환경(파일 직접 열기)에서는 보안상 저장이 제한될 수 있습니다.");
    });
}

window.onload = randomize;