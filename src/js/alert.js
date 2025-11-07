export default class Alert {
  constructor(alertFilePath = '../json/alerts.json') {
    this.alertFilePath = alertFilePath;
  }

  async init() {
    try {
      const response = await fetch(this.alertFilePath);
      if (!response.ok) throw new Error('Failed to load alerts');
      const alerts = await response.json();
      this.displayAlerts(alerts);
    } catch (error) {
      console.error('Error loading alerts:', error);
    }
  }

  displayAlerts(alerts) {
    if (!alerts || alerts.length === 0) return;

    const section = document.createElement('section');
    section.classList.add('alert-list');

    alerts.forEach(alert => {
      const p = document.createElement('p');
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      p.style.padding = '1em';
      p.style.textAlign = 'center';
      p.style.margin = '0';
      section.appendChild(p);
    });

    const main = document.querySelector('main');
    if (main) {
      main.prepend(section);
    }
  }
}
