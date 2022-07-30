class  film{
  constructor(title,description,release_year,language_id,original_language_id,length,rating,special_features){
    this.title=title;
    this.description=description;
    this.release_year=release_year;
    this.language_id=language_id;
    this.original_language_id=original_language_id;
    this.length=length;
    this.rating=rating;
    this.special_features=special_features;
  }
}

module.exports = film;
