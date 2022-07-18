import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { IProduto, IProdutoCarrinho } from '../produtos';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  itensCarrinho: IProdutoCarrinho []= [];
  total = 0;

  constructor(
    public carrinhoservice: CarrinhoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoservice.obterCarrinho();
    this.calcularTotal();
  }

  calcularTotal(){
    this.total = this.itensCarrinho.reduce((prev, curr) => prev +(curr.preco * curr.quantidade), 0)
  }
  removerProdutoDoCarrinho(produtoId: number){
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinhoservice.removerProdutoDoCarrinho(produtoId);
    this.calcularTotal();
  }

  comprar(){
    alert("Parabens, voce finalizou sua compra!");
    this.carrinhoservice.limparCarrinho();
    this.router.navigate(["produtos"])
  }


}
