class People {
    constructor(name,gender, email, subject, message) {
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }
}

class UI {
    static displayPeople2() {
        const people2 = Store.getPeople2();

        people2.forEach((people) => UI.addPeopleToList(people));
    }

    static addPeopleToList(people) {
        const list = document.querySelector('#people-list');

        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${people.name}</td>
          <td>${people.gender}</td>
          <td>${people.email}</td>
          <td>${people.subject}</td>
          <td>${people.message}</td>
          <td><a href="#" class="btn btn-info btn-sm delete"> X </a></td>
        `;

        list.appendChild(row);
    }

    static deletePeople(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#people-form');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#gender').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#subject').value = '';
        document.querySelector('#message').value = '';
    }
}

class Store {
    static getPeople2() {
        let people2;
        if (localStorage.getItem('people2') === null) {
            people2 = [];
        } else {
            people2 = JSON.parse(localStorage.getItem('people2'));
        }

        return people2;
    }

    static addPeople(people) {
        const people2 = Store.getPeople2();
        people2.push(people);
        localStorage.setItem('people2', JSON.stringify(people2));
    }

    static removePeople(message) {
        const people2 = Store.getPeople2();

        people2.forEach((people, index) => {
            if (people.message === message) {
                people2.splice(index, 1);
            }
        });

        localStorage.setItem('people2', JSON.stringify(people2));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayPeople2);

document.querySelector('#people-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const gender = document.querySelector('#gender').value;
    const email = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const message = document.querySelector('#message').value;
    if (name === '' || gender === '' || email === '' || subject === '' || message === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        const people = new People(name, gender, email, subject, message);
        UI.addPeopleToList(people);
        Store.addPeople(people);
        UI.showAlert('success', 'success');
        UI.clearFields();
    }
});

document.querySelector('#people-list').addEventListener('click', (e) => {
    UI.deletePeople(e.target);
    Store.removePeople(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Removed', 'success');
});