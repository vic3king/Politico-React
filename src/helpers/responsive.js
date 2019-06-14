const toggleSidebar = () => {
  const sidebar = document.querySelector('.sidenav');
  if (sidebar.classList.contains('toggle')) {
    sidebar.classList.remove('toggle');
    return;
  }
  sidebar.classList.add('toggle');
};
export default toggleSidebar;
