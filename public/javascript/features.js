function ImagePicker(elementId) {
    var el = document.getElementById(elementId);
    var select = document.getElementById(elementId.replace('gallery',''));
    var items = el.querySelectorAll('[data-image-picker]');
    items.forEach((item) => {
        if(item.getAttribute('data-image-picker')===select.value) item.classList.toggle('active');
        item.addEventListener('click', () => {
            items.forEach((i) => {
                i.classList.remove('active');
            });
            item.classList.toggle('active');

            select.value = item.getAttribute('data-image-picker');
        });
    });
    select.addEventListener('change', () => {
        items.forEach((i) => {
            i.classList.remove('active');
            if(i.getAttribute('data-image-picker')===select.value) i.classList.toggle('active');
        });

    });

}