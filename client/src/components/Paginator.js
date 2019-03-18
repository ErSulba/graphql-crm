import React, { Component } from 'react';

export default class Paginator extends Component {
  state = {
    paginator: {
      pages: Math.ceil(Number(this.props.totalClients) / this.props.limit)
    }
  };
  render() {
    const { actual } = this.props;
    const pages = Math.ceil(this.props.totalClients / 10);
    //previous Button
    const previousBtn =
      actual > 1 ? (
        <button type='button' className='btn btn-success mr-2' onClick={this.props.previousPage}>
          &laquo;Anterior
        </button>
      ) : (
        ''
      );
    //Next button
    const nextBtn =
      actual !== pages ? (
        <button type='button' className='btn btn-success mr-2' onClick={this.props.nextPage}>
          Siguiente &raquo;
        </button>
      ) : (
        ''
      );

    console.log(pages);
    return (
      <div className='my-5 d-flex justify-content-center'>
        {previousBtn}
        {nextBtn}
      </div>
    );
  }
}
