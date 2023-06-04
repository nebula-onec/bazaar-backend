const connection = require();

class Image{

}
Image.find = (filters, columns=["*"]) => {
    return new Promise((resolve, reject)=> {
        let query=`SELECT ${columns.join(', ')} FROM images WHERE `;
        query += Object.keys(filters).map(function (key) {
            if(typeof key == string){
                return key + '="' + (filters[key]) + '"';
            }
            return key + '=' + (filters[key]);
        }).join('&&');
    });
}

module.exports = Image;