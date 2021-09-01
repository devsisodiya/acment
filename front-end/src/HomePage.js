import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/HomePage.css";
import "font-awesome/css/font-awesome.min.css";

import Login from "./Login";
import Signup from "./Signup";
import frontbg from "./images/homepage_illustrations/background.svg";
import sidebg from "./images/homepage_illustrations/sideBg.svg";
import logo from "./images/homepage_illustrations/logo for cisco.png";
import image1 from "./images/homepage_illustrations/footer.svg";
import image2 from "./images/homepage_illustrations/pic_1.svg";
import image3 from "./images/homepage_illustrations/pic_2.svg";
import image4 from "./images/homepage_illustrations/pic_3.svg";
import image5 from "./images/homepage_illustrations/pic_4.svg";
import image6 from "./images/homepage_illustrations/pic_5.svg";
import ft_image1 from "./images/homepage_illustrations/Mask Group 1.svg";
import ft_image2 from "./images/homepage_illustrations/Mask Group 2.svg";
import ft_image3 from "./images/homepage_illustrations/Mask Group 3.svg";
import twitter_logo from "./images/social_media_logos/twitter.svg";
import insta_logo from "./images/social_media_logos/insta.svg";
import linkedin_logo from "./images/social_media_logos/linkedin.svg";
import fb_logo from "./images/social_media_logos/fb.svg";
import youtube_logo from "./images/social_media_logos/youtube.svg";
import acment_logo_white from "./images/homepage_illustrations/Acment_logo.png";

function HomePage() {
  const [registerPart, setRegisterPart] = useState("");

  // ====================== React scripts ====================================

  // code for opening login form
  const open_login = (registerCategory) => {
    console.log("opening login form");

    console.log(registerCategory);
    setRegisterPart(
      <Login
        close_register={close_register}
        open_signup={open_signup}
        registerCategory={registerCategory}
      />
    );
    const homepageRegister = document.querySelector(".homepageRegister");
    const homepage = document.querySelector(".body");
    homepageRegister.classList.add("show__homepageRegister");
    homepage.style.overflowY = "hidden";
    console.log(homepage);
  };

  // Code for opening sign up form
  const open_signup = (registerCategory) => {
    console.log("opening signup form");
    setRegisterPart(
      <Signup
        close_register={close_register}
        open_login={open_login}
        registerCategory={registerCategory}
      />
    );
    const homepageRegister = document.querySelector(".homepageRegister");
    homepageRegister.classList.add("show__homepageRegister");
  };

  // Code for closing the register form
  const close_register = () => {
    console.log("closing register form");
    const homepageRegister = document.querySelector(".homepageRegister");
    homepageRegister.classList.remove("show__homepageRegister");
    setRegisterPart("");
  };

  // Opening and closing drop down form
  const toggleDropDown = () => {
    console.log("showing dropdown");
    const dropDown = document.querySelector(".dropdown__menu");
    dropDown.classList.toggle("show__dropdown__menu");
    console.log(dropDown.classList);
  };

  return (
    <div className="body">
      <div className="homepageRegister">{registerPart}</div>
      <img src={frontbg} alt="" className="frontBg" />
      <div className="big_circle"></div>
      <div className="small_circle"></div>
      <div className="sideBg">
        <img src={sidebg} alt="" />
      </div>
      <div className="grey_circle"></div>

      <div className="mainwrapper">
        <div className="headerbox">
          <div className="logo">
            <a href="#">
              <img src={logo} />
            </a>
          </div>
          <div className="headerbox__menu">
            <ul>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="/mentorship">Mentorship?</a>
              </li>
              <li>
                <a href="#">Pay Now</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
            </ul>
          </div>
          <button
            className="header__loginBtn"
            onClick={() => {
              open_login("student");
            }}
          >
            Log in
          </button>

          {/* *************************  Drop down code  ******************************* */}
          <div className="header__dropdown">
            <div className="header__hamburger" onClick={toggleDropDown}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="dropdown__menu">
              <i
                className="fa fa-times dropdown__cross"
                aria-hidden="true"
                onClick={toggleDropDown}
              ></i>
              <ul>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="/mentorship">Mentorship?</a>
                </li>
                <li>
                  <a href="#">Pay Now</a>
                </li>
                <li>
                  <a href="#">Pricing</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <button
                  className="dropdown__loginBtn"
                  onClick={() => {
                    toggleDropDown();
                    open_login("student");
                  }}
                >
                  Log in
                </button>
              </ul>
            </div>
          </div>

          {/* ********************************************************************* */}
        </div>

        {/* ************************************************************************************ */}

        <div className="part1">
          <div className="textPart">
            <h1>
              Personal <span>Mentorship</span>
            </h1>
            <p>
              Dedicated support of mentors from Top llTs, NITs and Govt. Medical
              Colleges to help you crack these exams with ease.
            </p>
            <button>Get Started</button>
          </div>
          <div className="imagePart">
            <img src={image1} alt="" />
          </div>
        </div>

        <div className="part2">
          <div className="textPart">
            <div className="imagePart">
              <img src={image2} alt="" />
            </div>
            <h1>TO BE SUCCESS</h1>

            <p>
              We believe in excellence in education and all round development .
              Every student is different and so are their needs. We tap into the
              potential of each student and help them reach the zenith of
              success. To achieve maximum efficiency we have personal mentors
              expert in their field in addition to minutely curated content and
              study resources.
            </p>
            <button>LEARN MORE</button>
          </div>
        </div>

        <div className="part3">
          <div className="text1">
            <div className="image1">
              <img src={image3} alt="" />
            </div>
            <h2>Live Sessions &amp; Calls</h2>
            <p>
              One on one Consultation Calls daily to assess your progress. Live
              Chapter Guidance Sessions by Educators and Mentors every alternate
              day.
            </p>
          </div>

          <div className="text2">
            <div className="image2">
              <img src={image4} alt="" />
            </div>
            <h2>Study Planner</h2>
            <p>
              Ace your preparation with customized study plan &amp; bi-weekly
              reviews that highlight your progress.
            </p>
          </div>
        </div>

        <div className="part4">
          <div className="textPart">
            <h1>Constant Motivation And Guidance</h1>
            <div className="imagePart">
              <img src={image5} alt="" />
            </div>
            <p>
              If a mentee ever lack confidence or loses motivation, our mentors
              are always there to cheer them up and help reach their full
              potential. These mentors, having themselves faced similar setbacks
              in their journey, know ways to get through and shall prove helpful
              I in paving your way towards success.
            </p>
            <button>LEARN MORE</button>
          </div>
        </div>

        <div className="part5">
          <div className="imagePart">
            <img src={image6} alt="" />
          </div>
          <div className="textPart">
            <p>
              With the correct guidance and monitoring, the student can be more
              focussed and perform better, thus we have a provision for parents
              to keep a continuous track as well.
            </p>
            <button>Read More</button>
          </div>
        </div>

        <div className="part6">
          <h1>Features Of Our Acment</h1>
          <p>Check out our list of awesome features below</p>
          <div className="part6_container">
            <div className="feature1">
              <div className="feature_image">
                <img src={ft_image1} alt="" />
              </div>
              <h2>Personalized Time Table</h2>
              <p>
                Our schedule is designed in such a way that it caters to your
                needs and requirements, so that you may study according to you
                study without any pressure. We try to help you maintain a
                balance between your daily schooling and your preparation for
                any exam simultaneously without feeling over burdened.
              </p>
              <button>LEARN MORE</button>
            </div>
            <div className="feature2">
              <div className="feature_image">
                <img src={ft_image2} alt="" />
              </div>
              <h2>Promoting Self Study By Providing Assessments</h2>
              <p>
                We take regular tests and provide assignments for them to
                complete under designated time. This helps them find out their
                weak areas so that they can particularly focus on their weak
                topics.
              </p>
              <button>LEARN MORE</button>
            </div>
            <div className="feature3">
              <div className="feature_image">
                <img src={ft_image3} alt="" />
              </div>
              <h2>One on One Personal Mentorship</h2>
              <p>
                We believe in giving you our utmost time and attention and
                therefore provide you direct access to your personal mentor whom
                you can contact any time you have an issue. He/she will be your
                constant guide in your journey to success.
              </p>
              <button>LEARN MORE</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer_upper">
          <div className="footer_list">
            <h3>Company </h3>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Leadership</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Customers</a>
              </li>
              <li>
                <a href="#">Partners</a>
              </li>
              <li>
                <a href="#">Referral Program</a>
              </li>

              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Legal</a>
              </li>
              <li>
                <a href="#">Trust Platform</a>
              </li>

              <li>
                <a href="#">Investor Relations</a>
              </li>
            </ul>
          </div>
          <div className="footer_list">
            <h3>Products</h3>
            <ul>
              <li>
                <a href="#">Products Overview</a>
              </li>
              <li>
                <a href="#">Droplets</a>
              </li>
              <li>
                <a href="#">Kubernetes</a>
              </li>
              <li>
                <a href="#">Managed Databases</a>
              </li>
              <li>
                <a href="#">Spaces</a>
              </li>
              <li>
                <a href="#">Marketplace</a>
              </li>
              <li>
                <a href="#">Load Balancers</a>
              </li>
              <li>
                <a href="#">Block Storage</a>
              </li>
              <li>
                <a href="#">Tools &amp; Integrations</a>
              </li>
              <li>
                <a href="#">API</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">Release Notes</a>
              </li>
            </ul>
          </div>
          <div className="footer_list">
            <h3>Community</h3>
            <ul>
              <li>
                <a href="#">Tutorials</a>
              </li>
              <li>
                <a href="#">Meetups</a>
              </li>
              <li>
                <a href="#">Q&mp;A</a>
              </li>
              <li>
                <a href="#">Write for Donations</a>
              </li>
              <li>
                <a href="#">Droplets for Demos</a>
              </li>
              <li>
                <a href="#">Hatch Startup Program</a>
              </li>
              <li>
                <a href="#">Shop Swag</a>
              </li>
              <li>
                <a href="#">Research Program</a>
              </li>
              <li>
                <a href="#">Currents Research</a>
              </li>
              <li>
                <a href="#">Open Source</a>
              </li>
              <li>
                <a href="#">Code of Conduct</a>
              </li>
              <li>
                <a href="#">Newsletter Signup</a>
              </li>
            </ul>
          </div>
          <div className="footer_list">
            <h3>Solutions</h3>
            <ul>
              <li>
                <a href="#">Web &amp; Mobile Apps</a>
              </li>
              <li>
                <a href="#">Website Hosting</a>
              </li>
              <li>
                <a href="#">Game Development</a>
              </li>
              <li>
                <a href="#">Streaming VPN</a>
              </li>
              <li>
                <a href="#">Startups</a>
              </li>
              <li>
                <a href="#">SaaS Solutions</a>
              </li>
              <li>
                <a href="#">Agency &amp; Web Dev Shops Managed Cloud</a>
              </li>
              <li>
                <a href="#">Hosting Providers</a>
              </li>
              <li>
                <a href="#">Big Data</a>
              </li>
              <li>
                <a href="#">Business Solutions</a>
              </li>
            </ul>
          </div>
          <div className="footer_list">
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Sales</a>
              </li>
              <li>
                <a href="#">Report Abuse</a>
              </li>
              <li>
                <a href="#">System Status</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer_lower">
          <div className="footer_lower_left">
            <div className="logo">
              <img src={acment_logo_white} alt="" />
            </div>
            <div className="copyright">
              &copy; Copyright 2021. All Rights Reserved.
            </div>
          </div>
          <div className="footer_lower_right">
            <div className="logos">
              <a href="#">
                <img src={fb_logo} alt="" />
              </a>
            </div>
            <div className="logos">
              <a href="#">
                <img src={insta_logo} alt="" />
              </a>
            </div>
            <div className="logos">
              <a href="#">
                <img src={linkedin_logo} alt="" />
              </a>
            </div>
            <div className="logos">
              <a href="#">
                <img src={twitter_logo} alt="" />
              </a>
            </div>
            <div className="logos">
              <a href="#">
                <img src={youtube_logo} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
