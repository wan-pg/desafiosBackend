import { Router } from 'express';
export const router=Router()



router.get('/',(req,res)=>{

    res.status(200).render('login')
})

router.get('/registro',(req,res)=>{

    res.status(200).render('registro')
})

