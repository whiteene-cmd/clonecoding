/* 메인 타이틀 물차오르는거  */
window.addEventListener('load',()=>{
    document.querySelectorAll('.fill').forEach(el=>{
        el.addEventListener('animationend',()=>{
            el.style.webkitTextFillColor = '#211e1f';
            el.style.color = '#211e1f';
            el.style.backgroundImage = 'none';
        }, {once:true})
    })
})

