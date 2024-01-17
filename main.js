let target = document.querySelector("#dynamic"); // dynamic이라는 id 속성을 갖는 문서 객체 선택 

function showString(){
    let string = "Welcome to 1006lem's Blog!"
    let stringArr = string.split(""); // 문자열을 한 글자씩 배열로 생성    
    return stringArr;
}

/* 타이핑 리셋 */
function resetTyping(){
    target.textContent = "";
    renderNextChar(showString());
}

/* 텍스트가 하나하나씩 보이도록 */
function renderNextChar(stringArr){
    if (stringArr.length > 0){
        target.textContent += stringArr.shift(); // 배열의 맨 앞 뺄 것 (Welcome to 1006lems Blog !의 맨 앞 -> W) , randomArr배열 update
        // console.log(stringArr);
        setTimeout(function(){
            updateAfterTop();
            renderNextChar(stringArr);
        }, 80);
    } else{
        // 전부 출력 완료
        setTimeout(resetTyping, 3000); // 3초 뒤 resetTyping
    }
}
renderNextChar(showString());

/* 커서가 깜빡임 효과 */
function blink(){ 
    target.classList.toggle("active"); /*toggle method -> active class가 추가/삭제 반복하도록*/
}

setInterval(blink, 500); /* blink 함수를 0.5초마다 반복 */


/* 커서 위치 이동 */
function updateAfterTop() {
    var lineHeight = parseInt(window.getComputedStyle(target).height);
    const oneLineHeight = 2 * parseFloat(getComputedStyle(document.documentElement).fontSize); // 기본 2rem

    // 줄 수 계산
    var numberOfLines = Math.floor(lineHeight / oneLineHeight);
    //console.log(numberOfLines)

    //console.log($("#dynamic").css('--after-top'))
    if (numberOfLines >= 2) {
        $("#dynamic").css('--after-top', oneLineHeight * (numberOfLines-1) + 18  + 'px');

        // $("#dynamic").css('--after-top', 2 * numberOfLines + 'rem');
    } else {
        $("#dynamic").css('--after-top', '0px');
    }
    // console.log(numberOfLines*3);
}

/* 웹사이트 크기 변경 시 커서 위치 변경 */
$(window).resize(function(){
    updateAfterTop();
})

function btnClick(){
    const dropdownContent = document.querySelector(".dropdown-content")
    if (dropdownContent.style.display == "none") {
        dropdownContent.style.display = "block";
    }
    else{
        dropdownContent.style.display = "none";
    }
}

/* 검색창 */
function searchText(){
    var inputText = document.getElementById("searchInput").value;
    var found = window.find(inputText);

    // 만약 찾았다면 스크롤
    if (found){
        var element = document.getSelection().anchorNode.parentElement;
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
    // else{
    //     alert('text not found')
    // }
}


/* 스크롤 fade in (k8s, docker, android-studio) */
$(document).ready(function(){
    //var animationQueue = []; // 애니메이션 큐

    $(window).scroll(function(){
        $('.info').each(function(){
            // 쿠버네티스 섹션이 중앙에 오면 fade in 되도록 
            var k8sSection = $(".Kubernetes");
            handleSection(k8sSection)

            // 도커 섹션이 중앙에 오면 fade in 되도록 
            var dockerSection = $(".Docker");
            handleSection(dockerSection)

            // 안드로이드 스튜디오 섹션이 중앙에 오면 fade in 되도록 
            var androidStudioSection = $(".Android-Studio");
            handleSection(androidStudioSection)
        });
    });

    // 섹션에 대한 처리 함수
    function handleSection(section) {
        if (isElementInViewport(section)) {
            section.find(".info p").each(function(index, element){
                setTimeout(function(){
                    $(element).animate({'opacity': 1}, 500);
                }, 250 * index);
            });
        } else {
            
        }
    }

    // 요소가 뷰포트 안에 있는지 확인하는 함수
    function isElementInViewport(element) {
        var rect = element[0].getBoundingClientRect();
        return (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
        );
    }
});

