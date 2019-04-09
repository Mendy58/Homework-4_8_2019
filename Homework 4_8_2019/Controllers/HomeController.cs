using PpldbLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Homework_4_8_2019.Controllers
{
    public class HomeController : Controller
    {
        PpldbMgr mgr = new PpldbMgr(Properties.Settings.Default.ConStr);
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddPerson(Person p)
        {
            mgr.AddPerson(p);
            var people = mgr.GetPeople();
            return Json(people);
        }
        [HttpPost]
        public ActionResult EditPerson(Person p)
        {
            mgr.UpdatePerson(p);
            var people = mgr.GetPeople();
            return Json(people);
        }
        [HttpPost]
        public ActionResult DeletePerson(int id)
        {
            mgr.DeletePersonById(id);
            var people = mgr.GetPeople();
            return Json(people);
        }
        public ActionResult GetPeople()
        {
            var people = mgr.GetPeople();
            return Json(people, JsonRequestBehavior.AllowGet);
        }
    }
}