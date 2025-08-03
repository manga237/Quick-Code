import "./style.css";
import { Questions } from "./questions";
const start = () => {
	let val = 0;
	let score = 0;
	while (a.firstChild) {
		a.firstChild.remove();
	}
	const prog = document.createElement("progress");
	prog.max = "10";
	prog.value = val;
	a.appendChild(prog);
	let question = Questions[0].question;
	let answers = Questions[0].answers;
	let reponse = Questions[0].correct;
	const l = document.createElement("p");
	l.innerText = question;
	a.appendChild(l);
	let label;
	let input;
	for (let iu of answers) {
		label = document.createElement("label");
		label.innerText = iu;
		input = document.createElement("input");
		label.appendChild(input);
		input.name = "choix";
		input.type = "radio";
		input.value = iu;
		a.appendChild(label);
	}

	const b = document.createElement("button");
	b.innerText = "Next";
	b.id = "start";
	a.append(b);
	const r = document.createElement("p");
	r.innerText = `La bonne réponse était : ${reponse}`;
	let i = 1;
	let i2 = 1;
	let time = 2;
	let int = 3000;
	let out;
	let tim;
	const b2 = document.createElement("button");
	b2.innerText = "Next";
	b.addEventListener("click", () => {
		const inp = document.querySelectorAll("input");
		if (time == 2) {
			const de = document.querySelectorAll("input");
			de.forEach((n) => {
				n.disabled = true;
			});
			b.remove();
			a.append(b2);
			b2.id = "start";
			b2.innerText = `Suivant dans ${time + 1}s`;
		}
		inp.forEach((n) => {
			r.innerText = `La bonne réponse était : ${reponse}`;
			if (n.value == reponse) {
				n.parentElement.style.backgroundColor = "green";
			}
			if (n.checked) {
				if (n.value == reponse) {
					score++;
				} else {
					n.parentElement.style.backgroundColor = "red";
					a.insertBefore(r, b2);
				}
			}
		});
		prog.value++;
		tim = setInterval(() => {
			b2.innerText = `Suivant dans ${time}s`;

			console.log("valeur de i", i, i2);

			time--;
		}, 1000);
		out = setTimeout(() => {
			clearInterval(tim);
			time = 2;
			int = 3000;
			b2.remove();
			r.remove();
			a.append(b);
			const d = document.querySelectorAll("label");
			b.innerText = "Next";

			d.forEach((n) => {
				n.remove();
			});
			if (i < Questions.length) {
				question = Questions[i].question;
				answers = Questions[i].answers;
				reponse = Questions[i].correct;
				l.innerText = question;
				for (let iu of answers) {
					label = document.createElement("label");
					label.innerText = iu;
					input = document.createElement("input");
					label.appendChild(input);
					input.name = "choix";
					input.type = "radio";
					input.value = iu;
					a.insertBefore(label, b);
				}
				time = 2;
			} else {
				let fin = a.childElementCount;
				while (a.firstChild && fin != 1) {
					a.lastChild.remove();
					fin--;
				}
				r.innerText = `Vous avez obttenu ${score} sur 10`;
				a.append(r);
			}
			i++;
			i2++;
		}, int);
	});
	b2.addEventListener("click", () => {
		clearTimeout(out);
		clearInterval(tim);
		int = 3000;
		time = 2;
		console.log("deb", i);
		b2.remove();
		r.remove();
		a.append(b);
		const d = document.querySelectorAll("label");
		b.innerText = "Next";
		d.forEach((n) => {
			n.remove();
		});
		if (i2 < Questions.length) {
			question = Questions[i].question;
			answers = Questions[i].answers;
			reponse = Questions[i].correct;
			l.innerText = question;
			for (let ui of answers) {
				label = document.createElement("label");
				label.innerText = ui;
				input = document.createElement("input");
				label.appendChild(input);
				input.name = "choix";
				input.type = "radio";
				input.value = ui;
				a.insertBefore(label, b);
			}
		} else {
			let fin = a.childElementCount;
			while (a.firstChild && fin != 1) {
				a.lastChild.remove();
				fin--;
			}
			r.innerText = `Vous avez obttenu ${score} sur 10`;
			a.append(r);
		}
		i++;
		i2++;
	});
};

const t = document.querySelector("#start");
const a = document.querySelector("#app");

t.addEventListener("click", start);

/* let i = 0;
t.addEventListener("click", () => {
	const l = document.querySelector("#question") ?? document.createElement("p");
	if (i >= table.length) {
		i = 0;
		l.remove();
	} else {
		a.insertBefore(l, t);
		l.innerText = table[i].nom;
		l.id = "question";
		i++;
	}
}); */
