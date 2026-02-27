document.addEventListener('DOMContentLoaded', () => {
    const markers = document.querySelectorAll('.map-marker');
    const regionTitle = document.getElementById('region-title');
    const regionDesc = document.getElementById('region-desc');
    const regionImg = document.getElementById('region-main-img');

    // Safety check if elements exist
    if (!regionTitle || !regionDesc || !regionImg) {
        // console.warn("Region elements not found on this page.");
        return;
    }

    const regionData = {
        magadh: {
            title: "Magadh Region",
            desc: "The heart of ancient India, home to the empires of Mauryas and Guptas. Explore the ruins of Nalanda, the enlightenment site of Bodh Gaya, and the hills of Rajgir.",
            img: "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?auto=format&fit=crop&w=800&q=80"
        },
        mithila: {
            title: "Mithila Region",
            desc: "Known for its rich Madhubani art and distinct culture. Visit Janakpur and Darbhanga to experience the birthplace of Sita and vibrant folk traditions.",
            img: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?auto=format&fit=crop&w=800&q=80"
        },
        anga: {
            title: "Anga Region",
            desc: "The land of Karna from Mahabharata. Bhagalpur, the 'Silk City', sits on the banks of the Ganges and is home to the Vikramshila Gangetic Dolphin Sanctuary.",
            img: "https://images.unsplash.com/photo-1600100598642-832f26034c44?auto=format&fit=crop&w=800&q=80"
        },
        bhojpuri: {
            title: "Bhojpuri Region",
            desc: "Famous for its brave history, Chhath Puja celebrations, and the birthplace of Veer Kunwar Singh. Experience the rustic charm and powerful heritage of western Bihar.",
            img: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?auto=format&fit=crop&w=800&q=80"
        }
    };

    markers.forEach(marker => {
        marker.addEventListener('click', () => {
            // Remove active class from all
            markers.forEach(m => m.classList.remove('active'));
            // Add active to clicked
            marker.classList.add('active');

            const regionKey = marker.getAttribute('data-region');
            const data = regionData[regionKey];

            if (data) {
                // Update text content with fade effect
                regionTitle.style.opacity = 0;
                regionDesc.style.opacity = 0;

                setTimeout(() => {
                    regionTitle.textContent = data.title;
                    regionDesc.textContent = data.desc;
                    regionTitle.style.opacity = 1;
                    regionDesc.style.opacity = 1;
                }, 300);

                // Update Image
                regionImg.src = data.img;
            }
        });
    });
});
