import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
	selector: 'app-principal',
	templateUrl: './principal.component.html',
	styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
	etica: number = 50;
	energia: number = 50;
	dados: number = 50;
	conhecimento: number = 50;
	gastos: number = 50;

	perguntas_tutorial: any[];
	perguntas: any[];
	passou_tutorial: Boolean;
	final1: any[];
	final2: any[];
	completou: any[];
	zerou: any[];
	first: Boolean;
	first_final: Boolean;
	p: any;
	teste: any;
	flags1_contador: number = 0;
	flags2_contador: number = 0;
	flags_final1: number = 4;
	tempo_inicial: Date;

	hover: Boolean;
	constructor(private router: Router, private afDb: AngularFireDatabase) {
		this.perguntas_tutorial = [];
		this.perguntas = [];
		this.completou = [];
		this.zerou = [];
		this.final1 = [];
		this.final2 = [];
		this.p = {
			value: {
				premissa: "Carregando...",
				personagem: "carregando...",
				opcoes: {
					op1: {
						t: "Carregando..."
					},
					op2: {
						t: "Carregando..."
					}
				},
				path: ""
			}
		};

		this.tempo_inicial = new Date();
		this.tempo_inicial.getTime();
	}

	ngOnInit() {
		this.getTutorial();
		this.getPerguntas();
		this.getCompletou();
		this.getZerou();
		this.getFinal1();
		this.getFinal2();
		console.log(this.p);
	}

	tutorial(){
		this.teste = { premissa: "Café é bom", opcao1: "Sarrei", opcao2: "Taokei", path: '../assets/personagens/hascker.png'};
	}

	getTutorial(){
		this.afDb.list('/tutorial'/*, ref => ref.orderByChild('').equalTo()*/
		).valueChanges().subscribe(r => {
			//this.perguntas_tutorial = r;
			for (var i = 0; i < r.length; i++) {
				var j = Math.floor(Math.log((Math.random()*10 + Math.random()*20 + Math.random()*30)/3)*10);
				this.perguntas_tutorial.push({id: j, value: r[i]});
			}
			this.p = {id: 0, value: r[0]};
			this.verPath(this.p.value.personagem);
			console.log("r");
			console.log("this.perguntas_tutorial", this.perguntas_tutorial);
		});
	}

	getPerguntas(){
		this.afDb.list('/principal'/*, ref => ref.orderByChild('').equalTo()*/
		).valueChanges().subscribe(r => {
			for (var i = 0; i < r.length; i++) {
				var j = Math.floor(Math.log((Math.random()*10 + Math.random()*20 + Math.random()*30)/3)*10);
				this.perguntas.push({id: j, value: r[i]});
			}
			this.perguntas.sort((a, b) => a.id - b.id);
			console.log("r", r);
			console.log("this.perguntas", this.perguntas);
		});
	}

	getCompletou(){
		this.afDb.list('/completou'/*, ref => ref.orderByChild('').equalTo()*/
		).valueChanges().subscribe(r => {
			this.completou = r
			console.log("r", r);
			console.log("this.completou", this.completou);
		});
	}

	getZerou(){
		this.afDb.list('/zerou'/*, ref => ref.orderByChild('').equalTo()*/
		).valueChanges().subscribe(r => {
			this.zerou = r
			console.log("r", r);
			console.log("this.zerou", this.zerou);
		});
	}

	getFinal1(){
		this.afDb.list('/final1'/*, ref => ref.orderByChild('').equalTo()*/
		).valueChanges().subscribe(r => {
			this.final1 = r
			console.log("r", r);
			console.log("this.final1", this.final1);
		});
	}

	getFinal2(){
		this.afDb.list('/final2'/*, ref => ref.orderByChild('').equalTo()*/
		).valueChanges().subscribe(r => {
			this.final1 = r
			console.log("r", r);
			console.log("this.final2", this.final2);
		});
	}

	clicou(e){
		if(e == 1){
			if(this.p.value.atributo != undefined){
				this.router.navigate(['']);
			}else{
				if(this.p.value.opcoes.op1.flag != undefined && this.p.value.opcoes.op1.flag == true){
					this.flags1_contador++;
				}else if(this.p.value.opcoes.op1.flag != undefined && this.p.value.opcoes.op1.flag == false){
					this.flags2_contador++;
				}
				if(this.p.value.encrusilhada != undefined){
					//carrega novas questões e roda o sort de novo
				}
				if(this.p.value.opcoes.op1.e != undefined){
					this.etica += this.p.value.opcoes.op1.e;
					this.checarAtributo();
				}
				if(this.p.value.opcoes.op1.c != undefined){
					this.energia += this.p.value.opcoes.op1.c;
					this.checarAtributo();
				}
				if(this.p.value.opcoes.op1.d != undefined){
					this.dados += this.p.value.opcoes.op1.d;
					this.checarAtributo();
				}
				if(this.p.value.opcoes.op1.g != undefined){
					this.gastos += this.p.value.opcoes.op1.g;
					this.checarAtributo();
				}
				if(this.p.value.opcoes.op1.s != undefined){
					this.conhecimento += this.p.value.opcoes.op1.s;
					this.checarAtributo();
				}
				if(this.p.value.opcoes.op1.s == undefined && this.p.value.opcoes.op1.e == undefined && this.p.value.opcoes.op1.c == undefined && this.p.value.opcoes.op1.d == undefined && this.p.value.opcoes.op1.g == undefined){
					this.proxPergunta();
				}
			}
		}else if(e == 2){
			if(this.p.value.atributo != undefined){
				this.router.navigate(['']);
			}else{
				if(this.p.value.opcoes.op2.flag != undefined && this.p.value.opcoes.op2.flag == true){
					this.flags1_contador++;
				}else if(this.p.value.opcoes.op2.flag != undefined && this.p.value.opcoes.op2.flag == false){
					this.flags2_contador++;
				}

				if(this.p.value.encrusilhada != undefined){
					//carrega novas questões e roda o sort de novo
				}

				if(this.p.value.opcoes.op2.e != undefined){
					this.etica += this.p.value.opcoes.op2.e;
					this.checarAtributo();
				}
				if(this.p.value.opcoes.op2.c != undefined){
					this.energia += this.p.value.opcoes.op2.c;
					this.checarAtributo();
				}
				if(this.p.value.opcoes.op2.d != undefined){
					this.dados += this.p.value.opcoes.op2.d;
					this.checarAtributo();
				}
				if(this.p.value.opcoes.op2.g != undefined){
					this.gastos += this.p.value.opcoes.op2.g;
					this.checarAtributo();
				}
				if(this.p.value.opcoes.op2.s != undefined){
					this.conhecimento += this.p.value.opcoes.op2.s;
					this.checarAtributo();
				}
				if(this.p.value.opcoes.op2.s == undefined && this.p.value.opcoes.op2.e == undefined && this.p.value.opcoes.op2.c == undefined && this.p.value.opcoes.op2.d == undefined && this.p.value.opcoes.op2.g == undefined){
					this.proxPergunta();
				}
			}
			
		}
	}

	proxPergunta(){
		if (!this.passou_tutorial) {
			for (var i = 0; i < this.perguntas_tutorial.length; i++) {
				if (this.p.value.premissa == this.perguntas_tutorial[i].value.premissa) {
					if (i == this.perguntas_tutorial.length-1) {
						this.passou_tutorial = true;
						break;
					}else{ 
						this.p = this.perguntas_tutorial[i+1];
						this.verPath(this.p.value.personagem);
						console.log("entrou no if de mudar a pergunta", this.p, this.perguntas_tutorial[i++]);
					}
				}
			}
		}else{
			if (!this.first) {
				this.p = this.perguntas[0];
				this.verPath(this.p.value.personagem);
				this.first = true;
			}else{
				var diff = Math.abs(new Date().getTime() - this.tempo_inicial.valueOf());
				var minutes = Math.floor((diff/1000)/60);

				if(this.flags1_contador >= this.flags_final1  && minutes == 3){
					if (!this.first_final) {
						this.p = {value: this.final1[0]};	
					}else{
						for (var i = 0; i < this.final1.length; i++) {
							if(this.p.value.premissa == this.final1[i].value.premissa){
								this.p = this.final1[i+1];
								this.verPath(this.p.value.personagem);
								console.log("entrou no if aaaa", this.p, this.perguntas[i+1]);
								break;
							}
						}
					}
				}else if(this.flags2_contador >= this.flags_final1 && minutes == 3){
					if (!this.first_final) {
						this.p = {value: this.final2[0]};	
					}else{
						for (var i = 0; i < this.final2.length; i++) {
							if(this.p.value.premissa == this.final2[i].value.premissa){
								this.p = this.final2[i+1];
								this.verPath(this.p.value.personagem);
								console.log("entrou no if aaaa", this.p, this.perguntas[i+1]);
								break;
							}
						}
					}
				}else{
					for (var i = 0; i < this.perguntas.length; i++) {
						console.log("i",i);
						if(this.p.value.premissa == this.perguntas[i].value.premissa){
							if(i == this.perguntas.length-1){
								console.log("recomeça");
								this.first = false;
								this.getPerguntas();
								break;
							}else{
								this.p = this.perguntas[i+1];
								this.verPath(this.p.value.personagem);
								console.log("entrou no if aaaa", this.p, this.perguntas[i+1]);
								break;
							}
						}
					}
				}
				
			}
		}
	}

	checarAtributo(){
		if (this.energia >= 100) {
			this.p = {value: this.completou[0]};
			this.verPath(this.p.value.personagem);
		}
		if(this.etica >= 100){
			this.p = {value: this.completou[1]};
			this.verPath(this.p.value.personagem);
		}
		if(this.conhecimento >= 100){
			this.p = {value: this.completou[2]};
			this.verPath(this.p.value.personagem);
		}
		if(this.gastos >= 100){
			this.p = {value: this.completou[3]};
			this.verPath(this.p.value.personagem);
		}
		if(this.energia <= 0){
			this.p = {value: this.zerou[0]};
			this.verPath(this.p.value.personagem);
		}
		if(this.etica <= 0){
			this.p = {value: this.zerou[1]};
			this.verPath(this.p.value.personagem);
		}
		if(this.dados <= 0){
			this.p = {value: this.zerou[2]};
			this.verPath(this.p.value.personagem);
		}
		if(this.conhecimento <= 0){
			this.p = {value: this.zerou[3]};
			this.verPath(this.p.value.personagem);
		}
		if(this.gastos <= 0){
			this.p = {value: this.zerou[4]};
			this.verPath(this.p.value.personagem);
		}

		if(this.energia > 0 && this.etica > 0 && this.dados > 0 && this.conhecimento > 0 && this.gastos > 0){
			this.proxPergunta();
		}
	}

	verPath(p){
		console.log("atributo");
		if(p == "Sistema"){
			this.p.value.path = '../assets/personagens/sistema.png';
		}else if (p == "Auditora") {
			this.p.value.path = '../assets/personagens/auditora.png';
		}else if (p == "Informante") {
			this.p.value.path = '../assets/personagens/informante.png';
		}else if (p == "Consultor") {
			this.p.value.path = '../assets/personagens/consultor.png';
			console.log("consultoooorr");
		}else if (p == "Empregadora"){
			this.p.value.path = '../assets/personagens/empregadora.png';
		}else if (p == "Cracker"){
			this.p.value.path = '../assets/personagens/hacker.png';
		}else if (p == "Prompt"){
			this.p.value.path = '../assets/personagens/cmd.png';
		}else if (p == "Filha"){
			this.p.value.path = '../assets/personagens/filha.png';
		}else if (p == "Delegada"){
			this.p.value.path = '../assets/personagens/delegada.png';
		}
	}

	ajustaHeight(el){
		console.log("capturou", el);
	}
}
