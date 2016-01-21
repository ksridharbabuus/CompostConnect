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
    public class ConsumerPickController : TableController<ConsumerPick>
    {
        protected override void Initialize(HttpControllerContext controllerContext)
        {
            base.Initialize(controllerContext);
            MobileServiceContext context = new MobileServiceContext();
            DomainManager = new EntityDomainManager<ConsumerPick>(context, Request, Services);
        }

        // GET tables/ConsumerPick
        public IQueryable<ConsumerPick> GetAllConsumerPick()
        {
            return Query(); 
        }

        // GET tables/ConsumerPick/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public SingleResult<ConsumerPick> GetConsumerPick(string id)
        {
            return Lookup(id);
        }

        // PATCH tables/ConsumerPick/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task<ConsumerPick> PatchConsumerPick(string id, Delta<ConsumerPick> patch)
        {
             return UpdateAsync(id, patch);
        }

        // POST tables/ConsumerPick
        public async Task<IHttpActionResult> PostConsumerPick(ConsumerPick item)
        {
            ConsumerPick current = await InsertAsync(item);
            return CreatedAtRoute("Tables", new { id = current.Id }, current);
        }

        // DELETE tables/ConsumerPick/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task DeleteConsumerPick(string id)
        {
             return DeleteAsync(id);
        }

    }
}