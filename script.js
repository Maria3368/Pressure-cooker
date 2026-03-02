(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    //Find the search input
    const searchInput = document.getElementById('fsrch');
    if (!searchInput) return;

    //Locate the SVG map
    const svg = document.querySelector('svg');
    if (!svg) {
      return;
    }

    //Collect all shape elements that have the class "image-mapper-shape"
    const shapes = Array.from(document.querySelectorAll('.image-mapper-shape'));
    if (shapes.length === 0) return;
    const shapeData = shapes.map(shape => {
      const titleElem = shape.querySelector('title');
      const title = titleElem ? titleElem.textContent.trim() : '';
      return { shape, title: title.toLowerCase() };
    });

    //Inject a highlight style if it doesn't already exist
    if (!document.getElementById('search-highlight-style')) {
      const style = document.createElement('style');
      style.id = 'search-highlight-style';
      style.textContent = `
        .image-mapper-shape.search-highlight {
          fill: rgba(255, 0, 0, 0.8) !important;
          stroke: #000000 !important;
          stroke-width: 2px !important;
          transition: fill 0.2s ease;
        }
      `;
      document.head.appendChild(style);
    }

    // 5. Highlighting function
    function highlightShapes(term) {
      const normalizedTerm = term.trim().toLowerCase();

      shapeData.forEach(item => {
        if (normalizedTerm !== '' && item.title.includes(normalizedTerm)) {
          item.shape.classList.add('search-highlight');
        } else {
          item.shape.classList.remove('search-highlight');
        }
      });
    }

    // 6. Initial check
    highlightShapes(searchInput.value);

    // 7. Listen to input events
    searchInput.addEventListener('input', function(e) {
      highlightShapes(e.target.value);
    });
  });
})();