// export default {
//     bind(el) {
//       el.addEventListener('input', function (e) {
//         let value = e.target.value.replace(/\D/g, '').substring(0, 8);
//         const day = value.substring(0, 2);
//         const month = value.substring(2, 4);
//         const year = value.substring(4, 8);
  
//         if (value.length >= 5) {
//           e.target.value = `${day}/${month}/${year}`;
//         } else if (value.length >= 3) {
//           e.target.value = `${day}/${month}`;
//         } else if (value.length >= 1) {
//           e.target.value = `${day}`;
//         }
  
//         el.dispatchEvent(new Event('input'));
//       });
//     }
//   };
  

  export default {
    bind(el) {
      el.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
          value = value.replace(/(\d{2})(\d)/, '$1/$2');
        }
        if (value.length >= 5) {
          value = value.replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
        }
        if (value.length > 10) {
          value = value.substring(0, 10);
        }
        e.target.value = value;
        el.dispatchEvent(new Event('input'));
      });
    }
  };
  