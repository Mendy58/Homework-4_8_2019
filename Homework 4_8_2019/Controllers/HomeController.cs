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
        public void AddPerson(Person p)
        {
            mgr.AddPerson(p);
        }
        [HttpPost]
        public void EditPerson(Person p)
        {
            mgr.UpdatePerson(p);
        }
        [HttpPost]
        public void DeletePerson(int id)
        {
            mgr.DeletePersonById(id);
        }
        public ActionResult GetPeople()
        {
            var people = mgr.GetPeople();
            return Json(people, JsonRequestBehavior.AllowGet);
        }
    }
}