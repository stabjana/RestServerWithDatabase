'use strict';

module.exports=function adapt(book) {
    return Object.assign(book,{
        bookId: +book.bookId,
        price: +book.price
    });
}


