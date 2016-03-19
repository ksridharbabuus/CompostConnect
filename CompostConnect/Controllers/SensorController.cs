using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.OData;
using Microsoft.WindowsAzure.Mobile.Service;
using CompostConnect.DataObjects;
using CompostConnect.Models;

namespace CompostConnect.Controllers
{
    public class SensorController : TableController<Sensor>
    {
        protected override void Initialize(HttpControllerContext controllerContext)
        {
            base.Initialize(controllerContext);
            MobileServiceContext context = new MobileServiceContext();
            DomainManager = new EntityDomainManager<Sensor>(context, Request, Services);
        }

        // GET tables/Sensor
        public IQueryable<Sensor> GetAllSensor()
        {
            return Query(); 
        }

        // GET tables/Sensor/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public SingleResult<Sensor> GetSensor(string id)
        {
            return Lookup(id);
        }

        // PATCH tables/Sensor/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task<Sensor> PatchSensor(string id, Delta<Sensor> patch)
        {
             return UpdateAsync(id, patch);
        }

        // POST tables/Sensor
        public async Task<IHttpActionResult> PostSensor(Sensor item)
        {
            Sensor current = await InsertAsync(item);
            return CreatedAtRoute("Tables", new { id = current.Id }, current);
        }

        // DELETE tables/Sensor/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task DeleteSensor(string id)
        {
             return DeleteAsync(id);
        }

    }
}