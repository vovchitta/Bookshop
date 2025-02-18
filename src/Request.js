class Request {
    constructor() {
        this.library = [];
    }

    getBooks(category, maxResults) {
        return fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=AIzaSyDpJNMouQ5hrH0v1FwmHHC5hIn68XRxzAg&printType=books&startIndex=0&maxResults=${maxResults}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.items && data.items.length > 0) {
                    this.library = data.items.map((item) => ({
                        picture: item.volumeInfo.imageLinks?.thumbnail || null,
                        author: item.volumeInfo.authors || 'The author is not specified',
                        bookName: item.volumeInfo.title || 'Unnamed',
                        averageRating: item.volumeInfo.averageRating || null,
                        rating: item.volumeInfo.ratingsCount || 0,
                        description: item.volumeInfo.description || null,
                        price: item.saleInfo?.retailPrice?.amount || null,
                    }));
                }
            })
            .catch((error) => {
                console.error('Ошибка при загрузке данных:', error);
            });
    }
} export default Request;
