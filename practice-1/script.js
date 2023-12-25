const phoneMask = (phone) => {
  let value = phone.replace(/\D/g, '');
  const maxDigits = 11;
  if (value.length > maxDigits) {
    value = value.substring(0, maxDigits);
  }

  return value.replace(/^(\d)/, '+$1 ')
    .replace(/^(\+\d{1,3}) (\d{3})/, '$1 $2 ')
    .replace(/(\d{3}) (\d{3})/, '$1 $2-')
    .replace(/(\d{2})(\d{2})$/, '$1-$2');
}
document.querySelector("input[type='tel']").addEventListener('input', (e) => e.target.value = phoneMask(e.target.value));

const modal = () => {
  let offsetTop = 0;
  const openModal = (id) => {
    offsetTop = window.scrollY;
    const modal = document.querySelector(id);
    modal.classList.add('modal--show');
  }

  const closeModal = (id) => {
    const modal = document.querySelector(id);
    modal.classList.remove('modal--show');
    window.scrollTo(0, offsetTop);
  }

  setTimeout(() => {
    openModal('#modal-partners');
  }, 1000)

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.modal') && !e.target.closest('.open-modal')) {
      closeModal('.modal')
    }
  })
  document.querySelector('.open-modal').addEventListener('click', () => openModal('#modal-partners'));
  document.querySelector('.close-modal').addEventListener('click', () => closeModal('#modal-partners'));
}
modal();


const dropdownInput = () => {
  const dropdown = document.querySelector('.dropdown');
  let open = false;
  const toggleDropdown = () => {
    if (open)  {
      dropdown.classList.remove('dropdown--open');
      dropdown.setAttribute("readonly", true);
    } else {
      dropdown.classList.add('dropdown--open');
      dropdown.setAttribute("readonly", false);
    }
    open = !open;
  }
  const closeDropdown = () => {
    dropdown.classList.remove('dropdown--open');
  }
  
  dropdown.addEventListener('click', toggleDropdown);
  dropdown.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      toggleDropdown();
    }
  });
  document.addEventListener('click', function(event) {
    if (open && !event.target.closest('.dropdown')) {
      toggleDropdown();
    }

    if (event.target.closest('.dropdown-item')) {
      dropdown.value = event.target.textContent;
      closeDropdown();
    }
  });
}
dropdownInput();

const previewInputFileImage = (inputFile, placePreview) => {
  const file = inputFile.files;
  if (file) {
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        placePreview.style.backgroundImage = `url(${event.target.result})`;
      }
      fileReader.readAsDataURL(file[0]);
  }
}
document.querySelector(".form-field__file").addEventListener("change", (e) => {
  const placePreview = document.querySelector(".form-field__file-preview");
  previewInputFileImage(e.target, placePreview);
});


const validateForm = (form) => {
  const submitButton = form.querySelector('button[type="submit"]');
  const requiresInputs =  form.querySelectorAll('input[required]');
  
  const checkValidity = () => {
    let isValid = true;
    requiresInputs.forEach(input => {
      if (!input.value) {
        isValid = false;
      }
    });
    submitButton.disabled = !isValid;
  };
  requiresInputs.forEach((input) => input.addEventListener('input', checkValidity));
  checkValidity();
}
validateForm(document.querySelector('.form'));