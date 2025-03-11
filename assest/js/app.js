// (function() {
//     var base = document.createElement('base');
//     base.href = window.location.origin + "/Bave2.0/";
//     document.head.appendChild(base);
//   })();
const ham =document.querySelector('.ham');
const nav =document.querySelector('nav');
ham.addEventListener('click', ()=>{
    ham.classList.toggle('transform')
    nav.classList.toggle('mobile')
})
const menu = document.querySelectorAll('.menu_wrapper');
console.log(menu);
const submenu = document.querySelectorAll('.submenu_wrapper');
console.log(submenu);

menu.forEach((element, index) => {
  element.addEventListener('click', function() {
    // submenu.forEach(subEl => {
    //   subEl.classList.remove('active');
    // });
    submenu[index].classList.toggle('active');
  });
});
const colorPick = document.querySelectorAll('.color_option');

colorPick.forEach(element => {
  element.addEventListener('click', () => {
    colorPick.forEach(el => el.classList.remove('active')); 
    element.classList.add('active');
  });
});
const size = document.querySelectorAll('.size');
size.forEach(element => {
  element.addEventListener('click', () => {
    size.forEach(el => el.classList.remove('active')); 
    element.classList.add('active');
  });
});


// const sticky =document.querySelector('.header');
// window.addEventListener("scroll", function () {
//   var scrollTop = window.scrollY;
//   if (scrollTop > 40) {
//     sticky.classList.add('sticky');
//   }
//   else{
//     sticky.classList.remove('sticky');
//   }
//   const text = document.querySelector('.scroll_text');
//   if (text) {
//     const val = window.scrollY / 5;
//     text.style.transform = `translateX(${val}px)`;
//   }
// });






// function scroll() {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   }
function showPopup(overlayId, popupId) {
  const overlay = document.getElementById(overlayId);
  const popup = document.getElementById(popupId);
  overlay.style.display = 'flex'; // Change from 'block' to 'flex' for centering
  setTimeout(() => {
      popup.classList.add('active');
  }, 10);
}

function hidePopup(overlayId, popupId) {
  const overlay = document.getElementById(overlayId);
  const popup = document.getElementById(popupId);
  popup.classList.remove('active');
  setTimeout(() => {
      overlay.style.display = 'none';
  }, 300);
}

function handleSubmit(event, popupId) {
  event.preventDefault();
  console.log(`Form submitted from: ${popupId}`);
  hidePopup('overlay1', popupId);
}

// --------coll-----
var acc = document.getElementsByClassName('faqs-title');
var i;

// Set the first tab as active by default
if (acc.length > 0) {
    acc[0].classList.add('active');
    var firstPanel = acc[0].nextElementSibling;
    firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';
}

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function () {
        this.classList.toggle('active');
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    });
}



// eye password
function togglePassword(inputId, eyeIconId) {
  var passwordInput = document.getElementById(inputId);
  var eyeIcon = document.getElementById(eyeIconId);
  if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
  } else {
      passwordInput.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const serviceItems = document.querySelectorAll('.position-relative');

  serviceItems.forEach(item => {
      const servicesLink = item.querySelector('.services-link, .text-decoration-none');
      const subMenu = item.querySelector('.sub_menu');
      const chevron = item.querySelector('.fa-chevron-down');

      if (servicesLink && subMenu && chevron) {
          servicesLink.addEventListener('click', function(e) {
              e.preventDefault();
              subMenu.classList.toggle('active');
              chevron.classList.toggle('rotate-chevron');
          });

          document.addEventListener('click', function(e) {
              if (!item.contains(e.target)) {
                  subMenu.classList.remove('active');
                  chevron.classList.remove('rotate-chevron');
              }
          });
      }
  });
});




const focusableSelector = "a[href], button, input, select, textarea";

function setPanelFocusability(panel, focusable) {
	panel.querySelectorAll(focusableSelector).forEach(el => el.tabIndex = focusable ? 0 : -1);
}

document.querySelectorAll(".tabs-content .tab-content").forEach(panel => setPanelFocusability(panel, false));

function updateIndicator() {
	const activeTab = document.querySelector(".tabs-nav button.active"), indicator = document.querySelector(".tab-indicator");
	if (activeTab && indicator) Object.assign(indicator.style, { left: activeTab.offsetLeft + "px", width: activeTab.offsetWidth + "px" });
}

function activateTab(tabId) {
	document.querySelectorAll(".tabs-nav button").forEach(tab => {
		tab.classList.toggle("active", tab.dataset.tab === tabId);
		tab.setAttribute("aria-selected", tab.dataset.tab === tabId);
	});
	document.querySelectorAll(".tabs-content .tab-content").forEach(panel => {
		panel.classList.toggle("active", panel.dataset.tab === tabId);
	});
	updateIndicator();
}

function enterPanelFocusTrap(panel, tabButton) {
	setPanelFocusability(panel, true);
	let focusableElements = [...panel.querySelectorAll(focusableSelector)].filter(el => el.offsetParent);
	if (focusableElements.length) focusableElements[0].focus();

	function panelKeydownHandler(e) {
		if (["ArrowUp", "Escape"].includes(e.key)) {
			e.preventDefault();
			exitPanelFocusTrap(panel, panelKeydownHandler);
			tabButton.focus();
		} else if (e.key === "Tab") {
			focusableElements = [...panel.querySelectorAll(focusableSelector)].filter(el => el.offsetParent);
			if (!focusableElements.length) return e.preventDefault();
			const [first, last] = [focusableElements[0], focusableElements.at(-1)];
			if ((e.shiftKey && document.activeElement === first) || (!e.shiftKey && document.activeElement === last)) {
				e.preventDefault();
				(e.shiftKey ? last : first).focus();
			}
		}
	}
	panel.addEventListener("keydown", panelKeydownHandler);
	panel._panelKeydownHandler = panelKeydownHandler;
}

function exitPanelFocusTrap(panel, handler) {
	panel.removeEventListener("keydown", handler);
	delete panel._panelKeydownHandler;
	setPanelFocusability(panel, false);
}

document.querySelectorAll(".tabs-nav button").forEach(tab => {
	tab.addEventListener("click", () => activateTab(tab.dataset.tab));
	tab.addEventListener("keydown", e => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			const panel = document.querySelector(`.tabs-content .tab-content[data-tab="${tab.dataset.tab}"]`);
			if (panel) enterPanelFocusTrap(panel, tab);
		}
	});
});

window.addEventListener("resize", updateIndicator);
updateIndicator();



function changeActiveTab(target) {
  let currentUrl = window.location.href; // Get current full URL
  let baseUrl = window.location.origin + window.location.pathname; // Base URL without query params

  // Check if already on profile.html
  if (!baseUrl.includes("profile.html")) {
    window.location.href = `profile.html?tab=${target}`;
    return;
  }

  // Update the active tab when already on profile.html
  const targetTab = target;

  // Remove 'active' class from all buttons and tab panes
  document.querySelectorAll(".tab-button").forEach(button => button.classList.remove("active"));
  document.querySelectorAll(".tab-pane").forEach(tab => tab.classList.remove("active"));

  // Add 'active' class to the selected tab button and pane
  document.querySelector(`.tab-button[data-tab="${targetTab}"]`)?.classList.add("active");
  document.getElementById(targetTab)?.classList.add("active");

  // Update the URL without reloading
  history.pushState(null, "", `profile.html?tab=${target}`);
}

// Function to activate the tab based on the URL parameter
function activateTabFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab");
  if (tab) {
    changeActiveTab(tab);
  }
}

// Ensure the correct tab is active when profile.html loads
window.onload = activateTabFromUrl;

function converActiveTab(target) {
  // Remove 'active' class from all buttons and tab panes
  document.querySelectorAll(".tab-button").forEach(button => button.classList.remove("active"));
  document.querySelectorAll(".tab-pane").forEach(tab => tab.classList.remove("active"));

  // Find the clicked button and add 'active' class
  document.querySelectorAll(".tab-button").forEach(button => {
      if (button.getAttribute("onclick").includes(target)) {
          button.classList.add("active");
      }
  });

  // Activate the corresponding tab pane
  document.getElementById(target).classList.add("active");
}

