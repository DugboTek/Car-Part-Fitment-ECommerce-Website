import React from 'react';
import {
    Select,
    Button
  } from '@chakra-ui/react'
import '../../Styles/ProductPage/Reviews.css'
import stars from '../../Images/stars.png'
import fourhalfstars from '../../Images/fourhalfstars.png'

function Reviews({reviews}) {
    console.log('ALIIIIII');
    console.log(reviews);
    // get and store data
    // should be passed the specific part adn tis data
    let featureReviews = [
        {'feature' : 'Easy to Install' ,
        'rating': ((Math.random() * 1) +4).toFixed(1)
        },
        {'feature' : 'Fast Shipping' ,
        'rating': ((Math.random() * 1) +4).toFixed(1)
        },
        {'feature' : 'Value for Price' ,
        'rating': ((Math.random() * 1) +4).toFixed(1)
        }, 
        {'feature' : 'Fitment' ,
        'rating': ((Math.random() * 1) +4).toFixed(1)
        }
    ]
    let avgReview = 0;
    reviews.forEach(review => {
        avgReview+= review.rating;
    });
    avgReview = (avgReview / reviews.length).toFixed(1);

    return(
        <div className='item-specs-extended'>
            
            
        <div className="product-description-box">
            <div className='pd-contents'>
                <hr/> 
                <h1>Product Description</h1>
                <p>
                At Polaris Parts, we understand the importance of finding auto parts that fit your vehicle perfectly. That's why we offer a vehicle fitment guarantee for all of our parts. Our team of experts work tirelessly to ensure that the products we offer are compatible with a wide range of vehicle makes and models. 
                <br/>
                <br/>
                 We use advanced technology and data to cross-reference the parts with the specific year, make, and model of your vehicle, so you can be confident that you're getting the correct product every time. Our commitment to vehicle fitment allows you to shop with confidence.
                </p>
            </div>

        </div>
        <hr/>

        <div className='reviews-container'>
            <div className='reviews-left'>
                <div className='reviews-overview'>
                    <div className='rating-container'>
                        <hr/>
                        <h1> Reviews </h1>
                        <img src={stars} alt='4 stars rating'></img>
                        <h2> ({avgReview}) </h2>
                        {/* This needs to be replaced with an average */}
                    </div>
                    <h3>({reviews.length} Customer Reviews)</h3>
                    {/* replace with count from data */}
                </div>
                <div className='feature-reviews'>
                    <h2>Reviews by Feature</h2>
                    {featureReviews.map(feature => {
                        return(
                            <h3>{feature.feature}: {feature.rating} Stars</h3>
                        )
                        }) 
                    }
                </div>
                <div className='add-review'>
                    <h2>Review this product</h2>
                    <p>Share your thoughts on your experience shopping with Polaris Parts</p>
                    <Button>Write a review </Button>

                </div>
            </div>
            <div className='reviews-right'>
                <div className='reviews-header'>
                        <h2>Reviews from Customers</h2>
                        <div className='sort-reviews-btn'>
                            <Select 
                            w="145px"
                            variant="outline" 
                            placeholder='Sort Reviews'
                            chakraStyles={{
                                container: (provided) => ({
                                    ...provided, 
                                    width: "100px"
                                })
                            }}>
                                <option value='high-low'>Rating: High to Low</option>
                                <option value='low-high'> Rating: Low to High</option>
                            </Select> 
                        </div>
                </div>
                <div className='customer-reviews-container'>
                        {reviews.map(review => {
                            return (
                                <div className='cust-review'>
                                    <h2>Polaris Customer</h2>
                                    <div className='star-rating'>
                                        <img src={fourhalfstars} alt='{review.rating} stars rating'></img>
                                        <h2> ({review.rating})</h2>
                                    </div>
                                    <p>{review.review}</p>
                                </div>
                            )
                        })}
                </div>
            </div>
            
        </div>
        </div>


    );
}

export default Reviews;
