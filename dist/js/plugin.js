var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 3,
        spaceBetween: 0,
        breakpoints: {
            1200: {
                slidesPerView: 3,
                spaceBetween: 0
            },
            1199: {
                slidesPerView: 3,
                spaceBetween: 0
            },
            991: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    });