using System;
using System.Collections.Generic;

namespace UniBarber.Repository.Interfaces
{
    public interface IBarbershopRepository<TEntity> where TEntity : class
    {
        void Create(TEntity item);
        TEntity FindById(Guid id);
        IEnumerable<TEntity> Get();
        IEnumerable<TEntity> Get(Func<TEntity, bool> predicate);
        void Remove(TEntity item);
        void Update(TEntity item);
    }
}
