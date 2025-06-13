import { FaWhatsapp } from "react-icons/fa"
import { FaFacebook, FaInstagram } from "react-icons/fa6"
import image1 from "../assets/image1.jpg"

export const subMenuItems=[
 {id: 1,
  title: 'Productos',
  href: '/celulares',},
  {id: 2,
    title: 'Productos',
    href: '/accesorios',},
  ]
export const productsLinks = [
    {
      id: 1,
      title: 'Productos',
      href: '/products',
      children: [
        {
          id: 1,
          title: 'Celulares',
          href: '/products/celulares',
          },  
          {

          id: 2,
          title: 'Accesorios',
          href: '/products/accesorios',
              },
          ],
        },
    ];
/*BANNER*/
 export const imagesLinks = [
      {
        id: 1,
        title: 'Image 1',
        imgSrc: image1,
      },
      {
        id: 2,
        title: 'Image 2',
        imgSrc: image1,
      },

    ];
/*FOOTER*/
export const socialLinks = [{
    id: 1,
    title: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: <FaFacebook/>,
},
{
    id: 2,
    title: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: <FaInstagram />,
},
]

export const contactLink =[{
    id: 1,
    title: '+1234567890',
    href: 'https://wa.me/1234567890',
    icon: <FaWhatsapp />,

}]

