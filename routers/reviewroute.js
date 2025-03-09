const router=require('express').Router({mergeParams: true});
const {NewReview,DeleteReview}=require('../controlers/Review')
const {reviewValidate}=require('../middlewares/ReviewValidate');
const {islogin}=require('../middlewares/isLogin');
const {isReviewAuthor}=require('../middlewares/IsReviewAuthor');


router.route('/').post(islogin,reviewValidate, NewReview)
router.route('/:reviewId').delete(islogin,isReviewAuthor,DeleteReview)

module.exports=router;