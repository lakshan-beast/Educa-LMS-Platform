import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    };

    fetchData();
  }, []); // මැද හිස් වරහන් ([]) දැමූ විට මෙය වෙබ් පිටුව load වන විට එක පාරක් පමණක් ක්‍රියාත්මක වේ

  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded shadow">
          <h2 className="font-bold text-xl">{product.name}</h2>
          <p className="text-gray-600">Rs. {product.price}</p>
        </div>
      ))}
    </div>
  );
}


import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

async function getStudentByField(loggedInId) {
  try {
    const studentRef = collection(db, "student");
    
    // id field එක සමාන අයෙක් සෙවීම
    const q = query(studentRef, where("id", "==", loggedInId));
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // පළමු ලේඛනය (Document) ලබා ගැනීම
      const studentData = querySnapshot.docs[0].data();
      console.log("ලොග් වූ ශිෂ්‍යයා:", studentData.fullName);
      return studentData;
    } else {
      console.log("දත්ත හමු නොවිණි");
    }
  } catch (error) {
    console.error("දෝෂයක් සිදු විය:", error);
  }
}


import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // ඔබේ firebase config file එකේ path එක දමන්න

export default function StudentProfile() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. දැනට ලොග් වී සිටින ශිෂ්‍යයාගේ ID එක (උදාහරණයක් ලෙස)
  // සත්‍ය වශයෙන්ම ලොග් වන විට ලැබෙන ID එක මෙතනට ආදේශ කරන්න
  const loggedInId = "EDU-MES-11-SADUNNIMSARA-0803"; 

  // 2. Firebase එකෙන් දත්ත සොයා ගන්නා Function එක
  async function getStudentByField(id) {
    try {
      const studentRef = collection(db, "student");
      const q = query(studentRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // පළමු ලේඛනයේ (Document) දත්ත ලබාගෙන return කිරීම
        return querySnapshot.docs[0].data();
      } else {
        console.log("එවැනි ශිෂ්‍යයෙක් හමු නොවිණි.");
        return null;
      }
    } catch (error) {
      console.error("දත්ත ලබාගැනීමේදී දෝෂයක්:", error);
      return null;
    }
  }

  // 3. පිටුව (Page) load වන විටම function එක run කිරීම
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getStudentByField(loggedInId); // මෙතනදී function එක call වේ
      setStudentData(data);
      setLoading(false);
    }
    loadData();
  }, [loggedInId]);

  // 4. දත්ත screen එකේ පෙන්වීම
  if (loading) return <p>දත්ත ලෝඩ් වෙමින් පවතී (Loading...)</p>;
  if (!studentData) return <p>ශිෂ්‍යයාගේ විස්තර සොයාගත නොහැකි විය.</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>ශිෂ්‍ය විස්තර (Student Profile)</h2>
      <hr />
      <p><b>නම:</b> {studentData.fullName}</p>
      <p><b>ශ්‍රේණිය:</b> {studentData.grade}</p>
      <p><b>ID එක:</b> {studentData.id}</p>
      <p><b>මව්පිය දුරකථන අංකය:</b> {studentData.parentMobile}</p>
      <p><b>තත්ත්වය:</b> {studentData.status}</p>
      
      <h3>හදාරන විෂයන්:</h3>
      <ul>
        {studentData.maths && <li>ගණිතය (Maths)</li>}
        {studentData.science && <li>විද්‍යාව (Science)</li>}
        {studentData.english && <li>ඉංග්‍රීසි (English)</li>}
      </ul>
    </div>
  );
}



  // useEffect(() => {
  //   const fetchData = async () => {
  //     const querySnapshot = await getDocs(collection(db, "students"));
  //     const data = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setStudents(data);
  //     // console.log(data);
  //   };

  //   fetchData();
  // }, []); // මැද හිස් වරහන් ([]) දැමූ විට මෙය වෙබ් පිටුව load වන විට එක පාරක් පමණක් ක්‍රියාත්මක වේ
  // <p>{studentFullName}</p>
  // <p className="student-id">{studentId}</p>
  //  <p>{studentGrade}</p>
  //   <p>{studentPassword}</p>
  //   <p>{studentPinNumber}</p>

  //   <p>{studentCreatedAt}</p>

  //   <p>{studentNumber}</p>
  //   <p>{ParentNumber}</p>
  // <p>{studentStatus} <PiSealCheckFill /></p>

  // useEffect(() => {
  //   const q = query(collection(db, "students"), orderBy("fullName","" "createdAt", "desc"));

  //   const unsubscribe = onSnapshot(
  //     q,
  //     (snapshot) => {
  //       const noticeList = snapshot.docs.map((doc) => ({
  //         docId: doc.id,
  //         ...doc.data(),
  //       }));
  //       setNotices(noticeList);
  //       setIsLoading(false);
  //     },
  //     (err) => {
  //       console.error("Live Notice Stream Error:", err);
  //       setIsLoading(false);
  //     },
  //   );

  //   return () => unsubscribe();
  // }, []);

  // async function getStudentByField(loggedInId) {
  //   try {
  //     const studentRef = collection(db, "student");

  //     // id field එක සමාන අයෙක් සෙවීම
  //     const q = query(studentRef, where("id", "==", loggedInId));

  //     const querySnapshot = await getDocs(q);

  //     if (!querySnapshot.empty) {
  //       // පළමු ලේඛනය (Document) ලබා ගැනීම
  //       const studentData = querySnapshot.docs[0].data();
  //       console.log("ලොග් වූ ශිෂ්‍යයා:", studentData.fullName);
  //       return studentData;
  //     } else {
  //       console.log("දත්ත හමු නොවිණි");
  //     }
  //   } catch (error) {
  //     console.error("දෝෂයක් සිදු විය:", error);
  //   }
  // }

   {/* <Link className="back-btn" to="/">
          <FaArrowLeft /> Back to Home Page
        </Link> */}

        {/* <div className="quick-actions">
          <Link>
            <IoHomeOutline className="icons" />
          </Link>
          <Link>
            <IoCalendarOutline className="icons" />
          </Link>
          <Link>
            <IoChatbubbleEllipsesOutline className="icons" />
          </Link>
          <Link>
            <IoBarChartOutline className="icons" />
          </Link>
          <Link>
            <IoLogOutOutline className="icons" />
          </Link>
        </div> */}

        {/* <div className="student-details">
              <p>{studentFullName}</p> */}
            {/* <p className="student-id">{studentId}</p> */}
            {/* <p>{studentGrade}</p>
              <p>{studentPassword}</p>
              <p>{studentPinNumber}</p>

              <p>{studentCreatedAt}</p>

              <p>{studentNumber}</p>
              <p>{ParentNumber}</p>
              <p>{studentStatus}</p>
            </div> */}

            {/* {students.map((s) => (
              <div key={s.id}>
                <h2 className="font-bold text-xl">{s.fullName}</h2>
                <p className="text-gray-600"> {s.id}</p>
              </div>
            ))} */}

            {/* <p>Your password is secure and encrypted.</p> */}

            {/* <div className="more-btns">
              <Link to="/tab-controller" className="fullclasss-btn">
                View Full Timetable & Notices
              </Link>
            </div> */}


            
            {/* <button onClick={handleLogout} className="browse-btn signout-btn">
              <FaRightFromBracket className="icon" />
              Sign Out
            </button> */}

            